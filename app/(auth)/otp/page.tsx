"use client";

import { useEffect, useState } from "react";
import { resendOtp, verifyUser } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/localStorage";
import ButtonLoader from "@/components/Common/ButtonLoader";

export default function otp() {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = getLocalStorageItem("auth_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signup");
    }
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e: any, index: any) => {
    // Handle backspace - move to previous field
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const otpInputs = document.querySelectorAll("input.otp-input");
      (otpInputs[index - 1] as HTMLElement).focus();
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers
    const otpDigits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];
    otpDigits.forEach((digit: any, index: any) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    // Focus appropriate field after paste
    const otpInputs = document.querySelectorAll("input.otp-input");
    if (otpDigits.length < 6) {
      (otpInputs[otpDigits.length] as HTMLElement).focus();
    } else {
      (otpInputs[5] as HTMLElement).focus();
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        setError("Email is missing.");
        return;
      }
      setLoading(true);
      await resendOtp({ email });
      setTimer(60);
      setIsResendDisabled(true);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      toast.success("OTP resent successfully!");
      setLoading(false);
    } catch (err:any) {
      setError("Failed to resend OTP. Please try again.");
      toast.error(err?.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      try {
        setLoading(true);
        setError("");

        // Create payload and call verification service
        const payload = { code: otpValue, email };
        const response: any = await verifyUser(payload);

        // Handle successful verification
        console.log("Verification successful:", response);
        // You can add navigation or success message here

        if (response.status === "success") {
          setLocalStorageItem("authToken", response.data.token);
          toast.success("OTP verified successfully!");
          removeLocalStorageItem("auth_email");
        } else {
          setError("Invalid OTP. Please try again.");
          toast.error("Invalid OTP. Please try again.");
        }
        router.push("/create-story");
      } catch (error:any) {
        console.error("OTP verification failed:", error);
        setError("Invalid OTP. Please try again.");
        toast.error(error?.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]'>
        <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[12px]'>
          OTP Verification
        </h1>
        <p className='text-[#2B1354] text-center font-sans text-base font-medium leading-normal mb-[34px]'>
          OTP has been sent to your email <span className='font-semibold'>{email}</span>
        </p>
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <div className='mb-[18px] flex items-center justify-between gap-[8px] md:gap-[12px]'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className='otp-input w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            ))}
          </div>
          {isResendDisabled ? (
            <p className='text-[#2B1354] text-center font-sans text-base font-medium leading-normal mb-[34px]'>
              Resend OTP in{" "}
              <span className='font-semibold underline'>{timer}s</span>
            </p>
          ) : (
            <div className='text-center mb-[34px]'>
              <button
                type='button'
                onClick={handleResend}
                className='text-[#2B1354] font-sans text-base font-semibold underline cursor-pointer'
              >
                Resend OTP
              </button>
            </div>
          )}

          {error && (
            <p className='text-red-600 text-center font-sans text-sm mb-2'>
              {error}
            </p>
          )}

          <button
            type='submit'
            className='flex justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer'
            disabled={otp.join("").length !== 6 || loading}
          >
            {loading ? <ButtonLoader dark={true} loading={true} /> : null}
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
