"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  try {
    // 1. Update Name Metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName
      }
    });

    if (metadataError) return { error: metadataError.message };

    // 2. Update Email if changed
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email !== email) {
      const { error: emailError } = await supabase.auth.updateUser({ email });
      if (emailError) return { error: emailError.message };
      return { success: true, emailWarning: true };
    }

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "An unexpected error occurred." };
  }
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  
  if (!file || file.size === 0) {
    return { error: "No file provided or file is empty." };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const fileExt = file.name.split('.').pop() || 'png';
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) return { error: uploadError.message };

    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (updateError) return { error: updateError.message };

    return { success: true, avatarUrl: publicUrl };
  } catch (err: any) {
    return { error: err.message || "An unexpected error occurred during upload." };
  }
}
