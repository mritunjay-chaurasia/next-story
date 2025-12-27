"use client";

import { resetPassword } from "@/services/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const hash = searchParams.get("hash");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordForm) => {
        // Check if hash exists
        if (!hash) {
            toast.error("Invalid reset link. Please request a new password reset.");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({
                hash: hash,
                password: data.password,
            });

            toast.success("Password reset successful!");
            setTimeout(() => router.push("/login"), 1000);
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]'>
                <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[12px]'>
                    Reset Password
                </h1>
                <form
                    className='space-y-4 md:space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='mb-[18px]'>
                        <input
                            type='password'
                            {...register("password")}
                            className='bg-[#D8D8D8]  text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
                            placeholder='New Password'
                        />
                        {errors.password && (
                            <p className='text-red-600 text-sm mt-1'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className='mb-[18px]'>
                        <input
                            type='password'
                            {...register("confirmPassword")}
                            className='bg-[#D8D8D8]  text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
                            placeholder='Retype New Password'
                        />
                        {errors.confirmPassword && (
                            <p className='text-red-600 text-sm mt-1'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <button
                        type='submit'
                        disabled={loading || !hash}
                        className='bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer'
                    >
                        Reset
                    </button>
                </form>
            </div>
        </>
    );
}
