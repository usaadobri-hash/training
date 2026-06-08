import { Sidebar } from "@/components/Sidebar";
import { ProgressProvider } from "@/context/ProgressContext";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <ProgressProvider>
      <div className="min-h-[100dvh] bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col min-h-[100dvh] pt-16 md:pt-0">
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProgressProvider>
  );
}
