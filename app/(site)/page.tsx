// import { Button } from "@headlessui/react";
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import ExampleStory from "@/components/Story/ExampleStory";
import { REVIEWS } from "@/config/constants";
import React from "react";
import ReviewImages from "@/components/Common/ReviewImages";
import { BadgeCheck, Images } from "lucide-react";


export default async function Home() {
  // redirect("/login");


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.famewall.io/frame.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <section className=" relative curve-shape homepage">
        <div className="container mx-auto relative z-10">
          <h1 className="text-white text-center candal-font text-[84px] font-normal leading-[108%] tracking-[-3.36px] mt-[34px] relative bnr-heading md:max-w-[70%] mx-auto">Crafting Fairy Tales from Real Life</h1>
          <div className="grid md:grid-cols-3 grid-cols-1 mt-[44px] items-start gap-[18px]">
            <div className="mt-[25px] order-2 md:order-1">
              <h5 className="flex items-center gap-[12px] mb-[24px]">
                <span className="text-white text-right font-poppins text-[26px] font-bold leading-normal">Process</span>
                <Image
                  width={24}
                  height={24}
                  alt="down-arrow"
                  src="/assets/images/down-arrow-white.svg"
                  className=""
                />
              </h5>
              <div className="flex flex-col gap-[12px]">
                <Link href="my-stories" >
                  <div className="bg-[#fff1] flex items-center justify-between gap-[18px] p-[8px] pr-[18px] rounded-[24px]">
                    <div className="flex items-center gap-[18px]">

                      <div className="rounded-[18px] w-[72px] h-[72px] bg-[#C96ADB] flex items-center justify-center">
                        <span className="text-[#EBEBEB] text-center font-poppins text-[32px] font-semibold leading-none">1</span>
                      </div>
                      <div>
                        <p className="text-white font-poppins text-[18px] font-bold leading-normal">Share Your Story</p>

                      </div>
                    </div>

                  </div>
                </Link>
                <Link href="my-stories">
                  <div className=" flex items-center justify-between gap-[18px] p-[8px] pr-[18px]">
                    <div className="flex items-center gap-[18px]">

                      <div className="rounded-[18px] w-[72px] h-[72px] bg-[#C4CD24] flex items-center justify-center">
                        <span className="text-[#2B1354] text-center font-poppins text-[32px] font-semibold leading-none">2</span>
                      </div>
                      <div>
                        <p className="text-white font-poppins text-[18px] font-bold leading-normal">We Bring it To Life</p>
                      </div>
                    </div>

                  </div>
                </Link>
                <Link href="my-stories">
                  <div className=" flex items-center justify-between gap-[18px] p-[8px] pr-[18px]">
                    <div className="flex items-center gap-[18px]">

                      <div className="rounded-[18px] w-[72px] h-[72px] bg-[#0CA9F6] flex items-center justify-center">
                        <span className="text-white text-center font-poppins text-[32px] font-semibold leading-none">3</span>
                      </div>
                      <div>
                        <p className="text-white font-poppins text-[18px] font-bold leading-normal">We Deliver it to You</p>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  order-1 md:order-2">
              <Link href="/create-story" className="p-[8px] bg-[#fff2] rounded-[40px] w-fit inline-block">
                <div className="bg-[#C4CD24] rounded-[40px] p-[6px] pl-[44px] flex items-center gap-[44px] cursor-pointer">
                  <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                    Create Book
                  </span>
                  <Image
                    width={42}
                    height={42}
                    alt="right-arrow"
                    src="/assets/images/white-right.svg"
                    className="p-[12px] rounded-full bg-[#2B1354] -rotate-45"
                  />
                </div>
              </Link>
              <Image
                width={300}
                height={300}
                alt="book-img"
                className="mt-[86px] jump-effect"
                src="/assets/images/bnr-book1.png"
              />
            </div>
            <div className="pt-[100px] relative thread2  order-3 md:order-3">
              <div className="flex items-center gap-[24px]">
                <Image
                  width={72}
                  height={72}
                  alt="charactor-img"
                  src="/assets/images/bnr-right.png"
                  className="rounded-[18px] w-[72px] h-[72px] object-cover"
                />
                <h5 className="text-white text-[26px] font-semibold leading-normal">Create Your Story</h5>
              </div>
              <p className="text-white font-poppins text-[18px] font-light leading-normal my-[24px]">You give us the details. Our easy-to-use AI helps you write and illustrate it. We print it and deliver it to you.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-[80px] md:mt-[15px]" id="how-it-works">
        <Image
          width={2000}
          height={500}
          src="/assets/images/clouds.png"
          alt="clouds"
          className="absolute bottom-[45px] right-0 left-0 w-full max-h-[630px] z-0 hidden md:block"
        />
        <div className="container mx-auto relative ">
          <h2 className="text-[#fff] md:text-[#2B282F] text-center candal-font md:text-[54px] text-[40px] font-normal leading-[108%] tracking-[-2.16px]">Easy 3-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px] md:gap-[28px] mt-[94px]">
            <div className="process-card rounded-[34px] bg-white shadow-[0px_44px_24px_0px_rgba(0,0,0,0.06)] pt-[94px] pb-[44px] px-[24px] relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[50px]  w-fit">
                <Image
                  width={100}
                  height={100}
                  alt="bg-img"
                  src="/assets/images/process-bg.svg"
                  className=""
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EBEBEB] text-center font-poppins text-2xl font-semibold z-10">1</span>
              </div>
              <h5 className="text-[#2B282F] text-center font-poppins text-[22px] font-semibold leading-normal">Step 1: Share Your Story</h5>
              <p className="text-[#2B282F] text-center text-[18px] font-normal leading-normal mt-[24px]">Fill in our easy-to-follow form, providing us with your loved one's name, their traits, and a cherished real-life experience or dream adventure you'd like the story to be based on.</p>
            </div>
            <div className="process-card rounded-[34px] bg-white shadow-[0px_44px_24px_0px_rgba(0,0,0,0.06)] pt-[94px] pb-[44px] px-[24px] relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[50px]  w-fit">
                <Image
                  width={100}
                  height={100}
                  alt="bg-img"
                  src="/assets/images/process-bg.svg"
                  className=""
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EBEBEB] text-center font-poppins text-2xl font-semibold z-10">2</span>
              </div>
              <h5 className="text-[#2B282F] text-center font-poppins text-[22px] font-semibold leading-normal">Step 2: We Bring it to Life</h5>
              <p className="text-[#2B282F] text-center text-[18px] font-normal leading-normal mt-[24px]">Our AI system crafts a fully illustrated, personalized book from your submitted details. You can then perfect the book through our easy-to-use editing platform. Each book is guaranteed to be unique, designed specifically around your loved one's experiences.</p>
            </div>
            <div className="process-card rounded-[34px] bg-white shadow-[0px_44px_24px_0px_rgba(0,0,0,0.06)] pt-[94px] pb-[44px] px-[24px] relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-[50px]  w-fit">
                <Image
                  width={100}
                  height={100}
                  alt="bg-img"
                  src="/assets/images/process-bg.svg"
                  className=""
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EBEBEB] text-center font-poppins text-2xl font-semibold z-10">3</span>
              </div>
              <h5 className="text-[#2B282F] text-center font-poppins text-[22px] font-semibold leading-normal">Step 3: We Deliver it to You</h5>
              <p className="text-[#2B282F] text-center text-[18px] font-normal leading-normal mt-[24px]">Your personalized book can be delivered in e-book or paperback format. With paperback, we also publish it on Amazon for you, and you keep 75% of profits from sales!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[124px]" id="about-us">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-[50px] items-center">
            <div className="col-span-1 md:col-span-4">
              <Image
                width={800}
                height={800}
                alt="image"
                src="/assets/images/about-img.png"
                className=" w-full h-auto"
              />
            </div>
            <div className="col-span-1 md:col-span-6">
              <h2 className="text-[#EBEBEB] candal-font md:text-[54px] text-[40px] font-normal leading-[108%] tracking-[-2.16px] md:max-w-[80%]">Why we started Once Upon My Story?</h2>
              <div className="mt-[44px] flex flex-col gap-[16px]">
                <p className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-normal">
                  Our journey started with a simple wish: to create something truly personal for the little ones. Other companies only offered basic name customizations, with no real connection to real-life experiences. So, we decided to take matters into our own hands.
                </p>
                <p className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-normal">
                  We mastered tools like Photoshop, Canva, DALL-E and Amazon KDP to craft fully personalized, heartfelt stories that bring your loved one's unique adventures to life.
                </p>
                <p className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-normal">
                  Once Upon My Story's mission is simple: to help you gift your loved one a truly one-of-a-kind story at a fair price.
                </p>
              </div>
              <Link href="/create-story" className="p-[8px] bg-[#fff2] rounded-[40px] mt-[34px] w-fit inline-block">
                <div className="bg-[#C4CD24] rounded-[40px] p-[6px] pl-[44px] flex items-center gap-[44px] cursor-pointer">
                  <span className="text-[#2B1354] font-poppins text-[16px] font-medium leading-normal">
                    Create Book
                  </span>
                  <Image
                    width={42}
                    height={42}
                    alt="right-arrow"
                    src="/assets/images/white-right.svg"
                    className="p-[12px] rounded-full bg-[#2B1354] -rotate-45"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section >
      <ExampleStory />
      <section className="bg-[#2D0C5E] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-10">What Our Users Say</h2>

          <div className="my-12 w-full">
            <div
              className="famewall-embed"
              data-src="kidsbookreview"
              data-format="grid"
              style={{ width: '100%' }}
            ></div>
          </div>

        </div>
      </section>


      <section className="py-[124px]">
        <div className="container mx-auto">
          <h2 className="text-[#EBEBEB] text-center candal-font md:text-[54px] text-[40px] font-normal leading-[108%] tracking-[-2.16px] md:max-w-[50%] mx-auto mb-[84px]">Frequently Asked Questions</h2>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                1. How personalized is a Once Upon My Story book?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>Each Once Upon My Story book is deeply personalized. It's not just about inserting your loved one's name in the story. We base the storyline on their interests, real-life experiences, or anything else you share with us.</p>
              <p>Each book includes:</p>
              <ul className="list-disc ml-[30px]">
                <li>Story Development: We craft an exclusive story, inspired by the unique information you provide about your loved one.</li>
                <li>Character Designs: Our AI system creates unique character designs based on your loved one's likeness and personality.</li>
                <li>Illustrations: We bring the story to life with 8 custom illustrations, capturing the adventures of your loved one.</li>
              </ul>

            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                2. How does the order process work?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>First, you provide us with details about your loved one - their name, traits, interests, and any specific experiences or themes you'd like in the story. Our AI system will create a draft of the fully illustrated book.</p>
              <p className="">Next, use our easy-to-follow book builder platform to edit and finalize your book.</p>
              <p>Finally, we deliver your completed book to you in either e-book or paperback format.</p>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                3. How long does it take to receive my book?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>You will receive your e-book immediately after finalizing it on our book builder platform.</p>
              <p>
                If you choose the paperback option, delivery times typically take 1-2 weeks but can vary based on Amazon's shipping schedule.
              </p>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                4. How much does a Once Upon My Story book cost?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>
                It will cost US$19.99 (or local currency equivalent) to use our AI system + book builder to create your custom book.For a paperback copy delivered to your door, it will cost you an additional US$16.99 (or local currency equivalent).
              </p>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                5. How can I get in touch with you?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>Email us at {" "}
                <Link className="underline" href="mailto:hello@onceuponmystory.com">
                  hello@onceuponmystory.com.
                </Link>
                {" "}We aim to reply all emails within 24 hours!</p>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="md:py-[28px] p-[15px] md:px-[44px] bg-[#3E216E] rounded-[30px] mb-[18px]" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer gap-[18px]">
              <span className="text-[#EBEBEB] font-poppins text-[20px] md:text-[24px] font-bold leading-normal text-start">
                6. Can I order a book as a gift?
              </span>
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-plus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] plus"
              />
              <Image
                width={28}
                height={28}
                alt="icon"
                src="/assets/images/faq-minus.svg"
                className="md:w-[28px] w-[16px] h-[16px] md:h-[28px] minus"
              />
            </DisclosureButton>
            <DisclosurePanel className="text-[#EBEBEB] font-poppins text-[18px] font-normal leading-[184%] mt-[24px] ">
              <p>Absolutely! A Once Upon My Story book makes a perfect gift. Just provide the details of the loved one for whom you're ordering, and we'll send the book to them.</p>
            </DisclosurePanel>

          </Disclosure>

        </div>
      </section>
    </>
  );
}
