"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClientModuleLock({ moduleId, children }: { moduleId: string, children: React.ReactNode }) {
  const { isModuleUnlocked, isLoaded } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isModuleUnlocked(moduleId)) {
      router.replace("/dashboard/modules");
    }
  }, [isLoaded, isModuleUnlocked, moduleId, router]);

  if (!isLoaded) return null;
  if (!isModuleUnlocked(moduleId)) return null;

  return <>{children}</>;
}
