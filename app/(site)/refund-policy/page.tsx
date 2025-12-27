export default async function RefundPolicyPage() {

  return (
    <>
      <div className='md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px] container mx-auto'>
        <h1 className='text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]'>
          Refund Policy
        </h1>
        <p>At Once Upon My Story, we understand that circumstances change, and we want to be fair to all of our valued customers. Our refund policy is clear and straightforward:</p>
        <ul className="ms-3">
          {/* <li><b>100% Refund:</b> If you decide to cancel your order within 24 hours of purchase, we offer a full 100% refund.</li> */}
          <li><b>75% Refund:</b> If you decide to cancel your order <u>before</u> finalizing your book on our book builder system.</li>
          <li><b>Refund on Paperback top-up:</b>  If you decide to cancel your order after the book has been completed but before it has been shipped out, we will refund the Paperback top-up fee.
          </li>
          <li><b>No Refund:</b> Once the book is complete/delivered, we regret that we cannot provide a refund as the product is personalized and cannot be resold.</li>
        </ul>
        <p>Please note, cancellation requests must be made via email. We will process your refund as per the policy stated above based on the time of your cancellation request.</p>
        <p>Our goal is to ensure that every customer has a positive experience with us. If you have any questions about our refund policy, please don't hesitate to get in touch by emailing us at hello@onceuponmystory.com.</p>
      </div>
    </>
  );

}
