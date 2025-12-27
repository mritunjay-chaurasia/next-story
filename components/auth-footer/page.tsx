import Image from "next/image";
import Link from "next/link";

export default function AuthFooter() {
    return (
        <>
           <footer className=" relative z-10 py-[34px]">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between justify-center items-center gap-[15px] md:gap-2  footer-content-area">
                <ul className="flex items-center gap-[18px] ">
                  <li>
                    <Link prefetch href="/" className="text-white font-light text-[14px] font-poppins underline decoration-solid decoration-auto underline-offset-auto">Home</Link>
                  </li>
                  <li>
                    <Link prefetch href="/#about-us" className="text-white font-light text-[14px] font-poppins underline decoration-solid decoration-auto underline-offset-auto">About Us</Link>
                  </li>
                  <li>
                    <Link prefetch href="/#how-it-works" className="text-white font-light text-[14px] font-poppins underline decoration-solid decoration-auto underline-offset-auto">How it Works</Link>
                  </li>
                </ul>
                <div className="flex md:flex-row flex-col items-center">
                  <div className="images-brunch flex items-center mr-[12px]">
                    <Image
                      src="/assets/images/person-img.png"
                      width={44}
                      height={44}
                      alt="shadow"
                      className="person-image"
                    />
                    <Image
                      src="/assets/images/person-img.png"
                      width={44}
                      height={44}
                      alt="shadow"
                      className="person-image"
                    />
                    <Image
                      src="/assets/images/person-img.png"
                      width={44}
                      height={44}
                      alt="shadow"
                      className="person-image"
                    />
                    <Image
                      src="/assets/images/person-img.png"
                      width={44}
                      height={44}
                      alt="shadow"
                      className="person-image"
                    />
                  </div>
                  <p className="text-[#C0A4EF] font-poppins text-base font-light">
                    <span className="text-[#EBEBEB] font-poppins text-base font-bold mr-[4px]">
                    25k
                    </span>
                    Users already sign up with us
                  </p>
                </div>
                <ul className="flex items-center gap-[18px] ">
                  <li>
                    <Link prefetch href="/terms-conditions" className="text-white font-light text-[14px] font-poppins underline decoration-solid decoration-auto underline-offset-auto">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link prefetch href="/privacy-policy" className="text-white font-light text-[14px] font-poppins underline decoration-solid decoration-auto underline-offset-auto">Privacy Policy</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </footer>
        </>
    );
}
