import Image from "next/image";
import Backbtn from "@/components/back-btn/page";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { printAmount } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { payForStory } from "@/services/story-service";
import Spinner from "@/components/Common/Spinner";

type CheckoutScreenProps = {
  story?: Story;
};

export default function CheckoutScreen({
  story,
}: CheckoutScreenProps) {

  const router = useRouter();

  const [wantHardCopy, setWantHardCopy] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [softCopyPrice, setSoftCopyPrice] = useState(null);
  const [hardCopyPrice, setHardCopyPrice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const [paymentStarted, setPaymentStarted] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [proceedPaymentAfterConfirm, setProceedPaymentAfterConfirm] = useState(false);

  const [showStoryBuildChoice, setShowStoryBuildChoice] = useState(true);

  const [proceedWithHardCopy, setProceedWithHardCopy] = useState(false);

  const [purchaseType, setPurchaseType] = useState<"all" | "softCopy">("all");

  const [isLoadingChoice1, setIsLoadingChoice1] = useState(false);
  const [isLoadingChoice2, setIsLoadingChoice2] = useState(false);

  const { configurations } = useUser();

  useEffect(() => {
    if (configurations?.prices) {
      setSoftCopyPrice(configurations?.prices?.softCopyPrice);
      setHardCopyPrice(configurations?.prices?.hardCopyPrice);
    }
  }, [configurations]);

  const handleGoBack = () => {
    router.push(`/my-stories`);
  }

  const handleToggleHardCopy = () => {
    console.log("wanthardCopy", wantHardCopy);
    if (!wantHardCopy) {
      setPurchaseType("all");
    } else {
      setPurchaseType("softCopy");
    }
    setWantHardCopy(!wantHardCopy);
  }

  const handleToggleMarketingConsent = () => {
    setMarketingConsent(!marketingConsent);
  }

  const handlePaymentStart = () => {
    setPaymentStarted(true);
  }

  const handlePay = () => {

    console.log("proceedWithHardCopy", proceedWithHardCopy);

    // if (!wantHardCopy && !setProceedWithHardCopy) {
    //   setShowStoryBuildChoice(true);
    //   return;
    // }
    // console.log("wantHardCopy,proceedPaymentAfterConfirm", wantHardCopy, proceedPaymentAfterConfirm);
    // if (!wantHardCopy && !proceedPaymentAfterConfirm) {
    //   setShowStoryBuildChoice(true);
    //   return;
    // }

    if (story?._id) {
      setLoading(true);
      setPaymentStarted(false);
      setPaymentUrl(null);
      console.log("purchaseType", purchaseType);
      payForStory(story._id, {
        marketingConsent,
        purchaseType,
      })
        .then((res: any) => {
          window.location.replace(res.data.url);
        })
        .catch((err: any) => {
          console.log("Payment failed:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (proceedPaymentAfterConfirm) {
      handlePay();
    }
  }, [proceedPaymentAfterConfirm]);

  // console.log("showStoryBuildChoice", showStoryBuildChoice);
  // console.log("proceedPaymentAfterConfirm", proceedPaymentAfterConfirm);

  return (
    <>
      <Backbtn onClick={handleGoBack} />
      <h1 className="text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]">
        Checkout
      </h1>


      {
        paymentStarted ? <>
          <div className="max-w-[600px] mx-auto">
            <div className="w-full flex items-center justify-center mb-[24px]">
              <span className="text-[#2B282F] block font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                Please wait we are verifying your payment.
              </span>
            </div>
            <Spinner />
            <div className="mt-5 w-full flex items-center justify-center">
              <span className="text-[#2B282F] block font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                If your payment fails or not completed you can retry by clicking below button.
              </span>
            </div>
            <button
              disabled={loading}
              onClick={handlePay}
              type="button"
              className="bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
            >
              Retry Payment
            </button>
          </div>
        </> : <>

          {showStoryBuildChoice ? (
            <div className="max-w-[800px] mx-auto bg-[#F9F9FA] rounded-[24px] p-6 md:p-8 shadow-xl border border-[#E5E5E5]">
              <h2 className="text-[#2B1354] text-[22px] md:text-[26px] font-bold text-center mb-2">
                How would you like to create your storybook?
              </h2>
              <p className="text-[#6F6A77] text-[16px] font-poppins text-center mb-6">
                Please choose one option
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Build It Yourself Option */}
                <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-6 flex flex-col justify-between text-center">
                  <div>
                    <div className="bg-[#D9DF23] rounded-full p-3 mb-4 mx-auto w-fit">
                      <img src="/assets/images/edit-img.svg" alt="Edit Icon" className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#2B1354] text-[18px] font-semibold mb-2">
                      Build It Yourself
                    </h3>
                    <p className="text-[#6F6A77] text-[14px] mb-6">
                      I want to use the AI Book Builder to create my story. Perfect for creative
                      parents, cool uncles/aunties, or anyone who wants full control. Easy, guided
                      steps. Instant preview. Your imagination, your way.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // setIsLoadingChoice1(true);
                      setPurchaseType("softCopy");
                      setWantHardCopy(false);
                      setProceedWithHardCopy(false);
                      setShowStoryBuildChoice(false);

                      // setProceedPaymentAfterConfirm(true);
                      // setTimeout(() => {
                      //   setShowStoryBuildChoice(false);
                      //   setIsLoadingChoice1(false);
                      // }, 6000);
                    }}
                    className="mt-auto px-5 py-3 rounded-full bg-[#2B1354] text-white text-sm font-semibold hover:bg-[#1d0d3a] transition"
                  >
                    {isLoadingChoice1 ? (
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Building...
                      </span>
                    ) : (
                      "Start Building My Book"
                    )}
                  </button>
                </div>

                {/* Let Us Do It Option */}
                <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-6 flex flex-col justify-between text-center">
                  <div>
                    <div className="bg-[#D9DF23] rounded-full p-3 mb-4 mx-auto w-fit">
                      <img src="/assets/images/fluent_book-star-20-filled.svg" alt="Star Icon" className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#2B1354] text-[18px] font-semibold mb-2">
                      Let Us Do It For You
                    </h3>
                    <p className="text-[#6F6A77] text-[14px] mb-6">
                      I want the Once Upon My Story team to build it for me. Our expert storytellers
                      will craft a magical, personalized book — no effort needed.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // setIsLoadingChoice2(true);
                      setWantHardCopy(true);
                      setShowStoryBuildChoice(false);
                      // setProceedPaymentAfterConfirm(true);
                      // setTimeout(() => {
                      //   setShowStoryBuildChoice(false);
                      //   setIsLoadingChoice2(false);
                      // }, 6000);
                    }}
                    className="mt-auto px-5 py-3 rounded-full bg-[#C4CD24] text-[#2B1354] text-sm font-semibold hover:bg-[#b5c820] transition"
                  >
                    {isLoadingChoice2 ? (
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Building...
                      </span>
                    ) : (
                      "Let the Team Build My Book"
                    )}
                  </button>
                </div>
              </div>

              {/* <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setShowStoryBuildChoice(false)
                  }}
                  className="px-6 py-3 rounded-full bg-[#2B1354] text-white text-sm font-semibold hover:bg-[#1d0d3a] transition"
                >
                  Back
                </button>
              </div> */}

            </div>
          ) : (

            <div className="max-w-[600px] mx-auto">
              <p className="text-[#6F6A77] font-poppins text-[14px] font-medium leading-normal mb-[10px]">
                Book
              </p>
              <div className="flex   items-center justify-between gap-[8px] mb-[24px]">
                <div className="flex items-center gap-[12px] md:gap-[18px]">
                  <p className="text-[#2B282F] font-poppins text-[14px] md:text-[16px] font-medium leading-normal">
                    {story?.title}
                  </p>
                </div>
                <p className="text-[#2B282F] font-sans font-semibold text-base leading-normal">
                  {printAmount(softCopyPrice)}
                </p>
              </div>
              <label className="inline-flex items-center mb-5 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={wantHardCopy}
                  onChange={handleToggleHardCopy}
                  className="sr-only peer"
                />
                <div className="relative w-13 md:w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#C4CD24] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2B1354] dark:peer-checked:bg-[#2B1354]"></div>
                <span className="text-[#2B282F] font-sans font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                  I want to get a hard copy of book as well
                </span>
              </label>
              <label className="w-full flex items-center mb-[24px]">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={handleToggleMarketingConsent}
                />
                <span className="text-[#2B282F] font-sans font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                  I consent for my book to be used as marketing material on Once Upon
                  My Story's marketing channels
                </span>
              </label>
              <div className="rounded-[24px] py-[18px] px-[24px] bg-[#E1E1E1]">
                <h2 className="text-[#2B282F] font-sans text-[18px] md:text-[22px] font-normal leading-normal tracking-[-0.88px] candal-font mb-[24px]">
                  Payment Summary
                </h2>
                <ul>
                  <li className="flex items-start gap-[18px] justify-between w-full mb-[12px]">
                    <span className="text-[#6F6A77] font-sans font-medium text-base leading-normal">
                      {story?.title}
                    </span>
                    <span className="text-[#2B282F] text-right font-sans font-medium text-base leading-normal">
                      {printAmount(softCopyPrice)}
                    </span>
                  </li>
                  {
                    wantHardCopy ? <>
                      <li className="flex items-start gap-[18px] justify-between w-full mb-[12px]">
                        <span className="text-[#6F6A77] font-sans font-medium text-base leading-normal">
                          Hard Copy
                        </span>
                        <span className="text-[#2B282F] text-right font-sans font-medium text-base leading-normal">
                          +{printAmount(hardCopyPrice)}
                        </span>
                      </li>
                    </> : null
                  }

                </ul>
                <div className="border-t border-[#C5C5C5] mt-[16px] pt-[16px]">
                  <p className="flex items-start gap-[18px] justify-between w-full mb-[12px]">
                    <span className="text-[#6F6A77] font-sans font-medium text-base leading-normal">
                      Grand Total
                    </span>
                    <span className="text-[#2B282F] text-right font-sans font-bold text-base leading-normal">
                      {
                        (wantHardCopy && softCopyPrice && hardCopyPrice) ? <>
                          {printAmount(parseFloat(softCopyPrice) + parseFloat(hardCopyPrice))}
                        </> : <>
                          {printAmount(softCopyPrice)}
                        </>
                      }
                    </span>
                  </p>
                </div>
              </div>

              {
                paymentUrl ? <>
                  <div className="w-full mt-5 flex items-center mb-[24px]">
                    <span className="text-[#2B282F] font-sans text-center font-medium text-[14px] md:text-[16px] leading-normal ml-[12px]">
                      Please click the below button to pay now, once payment is successful, you can close that window and come back here to check status.
                    </span>
                  </div>
                  <a
                    target="_blank"
                    onClick={handlePaymentStart}
                    href={paymentUrl}
                    className="bg-[#C4CD24] block rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
                  >
                    Click to Pay Now
                  </a>
                </> : <>
                  <button
                    disabled={loading}
                    onClick={handlePay}
                    type="button"
                    className="bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] mb-0 text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer mt-[24px]"
                  >
                    {loading ? 'Loading...' : 'Proceed to Pay'}
                  </button>
                </>
              }

            </div>
          )}

        </>

      }
    </>
  );
}