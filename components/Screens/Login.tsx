"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signInSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { login } from "@/services/auth-service";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { googleAuthCallback } from "@/services/auth-service";
import { useEffect, useState } from "react";
import { setLocalStorageItem } from "@/lib/localStorage";
import GoogleBtn from "@/components/google-btn/page";
import ButtonLoader from "../Common/ButtonLoader";

export default function Login() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response: any = await login(data);
            if (response?.data?.token) {
                setLocalStorageItem("authToken", response.data.token);
            }
            router.push("/my-stories");
        } catch (err: any) {
            toast.error(err?.message);
            setLoading(false);
        }
    };

    const handleGoogleCallback = async (code: any) => {
        try {
            setLoading(true);
            const response: any = await googleAuthCallback({ code });
            const { token } = response.data;
            // Store token and user info in localStorage
            setLocalStorageItem("authToken", token);
            // Redirect to dashboard
            router.push("/my-stories");
        } catch (err) {
            toast.error("Google login failed");
            router.push("/login");
            setLoading(false);
        }
    };

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            handleGoogleCallback(code);
        }
    }, [searchParams]);

    return (
        <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]'>
            <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]'>
                Login
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
                    />
                    {errors.password && (
                        <p className='text-red-600 text-sm mt-1'>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className='flex items-center justify-between mb-[18px]'>
                    <Link
                        href='/forgot-password'
                        className='text-[#2B1354] font-poppins text-base font-medium leading-normal hover:underline'
                    >
                        Forgot password?
                    </Link>
                </div>
                <button
                    type='submit'
                    className='flex justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer disabled:bg-gray-400'
                    disabled={loading}
                >
                    {loading ? <ButtonLoader dark={true} loading={true} /> : null}
                    {loading ? "Please wait..." : "Login"}
                </button>
                <div className='or-divider relative w-full text-center my-[20px]'>
                    <span>Or</span>
                </div>
                <GoogleBtn />
                <p className='text-[#2B1354] text-center font-poppins text-base font-medium leading-normal'>
                    Don't have an account yet?{" "}
                    <Link
                        href='/register'
                        className='text-[#2B1354] font-poppins text-base font-semibold leading-normal underline'
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
