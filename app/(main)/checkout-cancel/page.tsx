'use client';

import { useEffect } from 'react';
export default function CheckoutCancelPage() {

    useEffect(() => {
        // Optionally notify the main tab if needed
        if (window.opener) {
            window.opener.postMessage({ status: 'cancel' }, '*');
        }

        // Optionally close this tab or redirect back after delay
        setTimeout(() => {
            window.close(); // Only works if opened with window.open()
        }, 3000);
    }, []);

    return (
        <>
            <div className='my-[50px] md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px] container mx-auto'>
                <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font'>
                    Payment Cancelled
                </h1>
                <p className='text-center'>If this was a mistake, you can return to the previous page and try again.</p>
            </div>
        </>
    );
}
