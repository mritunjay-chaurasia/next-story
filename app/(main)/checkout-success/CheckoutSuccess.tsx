'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectSeconds = 10;
    const [countdown, setCountdown] = useState(redirectSeconds);

    useEffect(() => {
        const redirectUrl = searchParams.get('redirect');

        if (!redirectUrl) return;

        // Countdown timer
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Redirect after 5 seconds
        const timeout = setTimeout(() => {
            window.location.href = redirectUrl;
        }, (1000 * redirectSeconds));

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [searchParams]);

    return (
        <>
            <div className='my-[50px] md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px] container mx-auto'>
                <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font'>
                    Payment Successful
                </h1>
                <p className='text-center'>
                    We are verifying your payment. You'll be redirected in <strong>{countdown}</strong> second{countdown !== 1 && 's'}...
                </p>
            </div>
        </>
    );
}
