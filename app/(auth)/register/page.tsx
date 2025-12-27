"use client"; // For Next.js App Router (if applicable)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";
import Link from "next/link";
import { z } from "zod";
import { signUp } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setLocalStorageItem } from "@/lib/localStorage";
import GoogleBtn from "@/components/google-btn/page";
import ButtonLoader from "@/components/Common/ButtonLoader";
import { useState } from "react";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      await signUp(data);
      setLocalStorageItem("auth_email", data.email);
      router.push("/otp");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]'>
      <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]'>
        Sign Up Account
      </h1>
      <form
        className='space-y-4 md:space-y-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-[18px]'>
          <input
            type='email'
            {...register("email")}
            className='bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
            placeholder='Email'
            autoComplete='off'
          />
          {errors.email && (
            <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>
        <div className='mb-[18px]'>
          <input
            type='password'
            {...register("password")}
            className='bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
            placeholder='Password'
            autoComplete='off'
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
            className='bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none'
            placeholder='Retype Password'
            autoComplete='off'
          />
          {errors.confirmPassword && (
            <p className='text-red-600 text-sm mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='flex justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer disabled:bg-gray-400'
          disabled={loading}
        >
          {loading ? <ButtonLoader dark={true} loading={true} /> : null}
          {loading ? "Please wait..." : "Sign Up"}
        </button>
        <div className='or-divider relative w-full text-center my-[20px]'>
          <span>Or</span>
        </div>
        <GoogleBtn />
        <p className='text-[#2B1354] text-center font-poppins text-base font-medium leading-normal'>
          Already Have an Account?{" "}
          <Link
            href='/login'
            className='text-[#2B1354] font-poppins text-base font-semibold leading-normal underline'
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
