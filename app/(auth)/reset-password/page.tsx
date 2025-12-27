"use client";

import ResetPassword from "@/components/Screens/ResetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </>
  );
}
