import Image from "next/image";
import { googleLogin } from "@/services/auth-service";


export default function GoogleBtn() {
    const handleGoogleLogin = async () => {
        try {
          const response:any = await googleLogin();
          console.log(response,'---response---');
          const loginUrl = response?.data;
    
          if (loginUrl) {
            window.location.href = loginUrl; // redirect to Google login page
          }
        } catch (err) {
          console.error("Google login failed", err);
        }
      };

    return (
        <>
            <button
                      type='button'
                      onClick={handleGoogleLogin}
                      className='rounded-[40px] bg-[#E1E1E1] w-full flex items-center gap-[12px] justify-center p-[12px] md:p-[17px] mb-[24px] cursor-pointer'
                    >
                      <Image
                        width={24}
                        height={24}
                        src='/assets/images/google-logo.svg'
                        alt='google-logo'
                      />
                      <span className='text-[#2B1354] text-center font-poppins text-base font-medium leading-normal'>
                        Continue with Google
                      </span>
                    </button>
        </>
    );
}