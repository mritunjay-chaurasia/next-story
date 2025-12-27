"use client";

import { forgetPassword } from "@/services/auth-service";
import Image from "next/image";
import { useState } from "react";
import { forgotPasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgetPassword({ email: data.email });
      toast.success("Reset Password Link has been sent to your email");
      // Redirect to create-story page after successful API call
    } catch (error:any) {
      console.error("Password reset failed:", error);
      toast.error(error?.message);
      // Handle error state
    }
  };
  return (
    <>
      <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]'>
        <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[12px]'>
          Forgot Password?
        </h1>
        <p className='text-[#2B1354] text-center font-sans text-base font-medium leading-normal mb-[34px]'>
          Enter your email below to reset password
        </p>
        <form
          className='space-y-4 md:space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-[18px]'>
            <input
              type='email'
              {...register("email")}
              className='bg-[#D8D8D8]  text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
              placeholder='Email'
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
