import React, { useEffect } from 'react';
import homepageImage from "../../assets/img/Homepage.png";

const TermsOfUse = () => {

  useEffect(() => {
      document.title = "Terms Of Use | Snbla";
  }, []);
  
    return (
      <>
        <section
          className="relative bg-no-repeat md:py-secpadding pt-[80px] pb-[40px]"
          style={{
            backgroundImage: `url(${homepageImage})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="container mx-auto 2xl:max-w-screen-xl flex flex-col lg:items-center lg:flex-col lg:gap-16 gap-8 sm:px-5 px-2">
            <div className="max-w-4xl sm:px-4 px-0 mx-auto flex-1">
              <h1 className="tab:mb-3 mb-2 tab:mt-4 mt-3 tracking-[1px] xl:text-[40px] lg:text-[35px] md:text-4xl text-2xl lg:font-extrabold font-bold xl:leading-[72px] lg:leading-[52px] text-black">
                Terms of Use
              </h1>
              <p className="text-base font-normal">
                Snbla Wallet gives your customers more than just rewards—it
                empowers them to save for their next big purchase, with your
                brand supporting them at every step
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                1. Acceptance of Terms
              </h3>
              <p className="text-base font-normal">
                By accessing and using this website, you agree to be bound by
                these Terms of Use and all applicable laws and regulations. If
                you do not agree with any of these terms, you are prohibited
                from using or accessing this site.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                2. Use License
              </h3>
              <p className="text-base font-normal">
                You are granted a limited, non-exclusive, and non-transferable
                license to access and use the website for personal or commercial
                use. You may not use the content for any unauthorized or
                unlawful purpose.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                3. Prohibited Activities
              </h3>
              <p className="text-base font-normal">
                You agree not to engage in any activities that could damage,
                disable, or impair the functionality of the website, including
                but not limited to hacking, spamming, or attempting to interfere
                with the operation of the website.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                4. Privacy Policy
              </h3>
              <p className="text-base font-normal">
                Your use of this website is also governed by our Privacy Policy.
                Please review it to understand how we collect and use your data.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                5. Disclaimers
              </h3>
              <p className="text-base font-normal">
                The website is provided as is and as available. We do not
                guarantee that the website will be error-free, uninterrupted, or
                free from harmful components.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                6. Limitation of Liability
              </h3>
              <p className="text-base font-normal">
                We will not be liable for any damages arising from the use or
                inability to use the website, including but not limited to
                indirect, incidental, or consequential damages.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                7. Modifications
              </h3>
              <p className="text-base font-normal">
                We reserve the right to modify or update these Terms of Use at
                any time. Any changes will be posted on this page, and your
                continued use of the website constitutes your acceptance of the
                revised terms.
              </p>
              <h3 className="text-xl  font-semibold text-black  my-3">
                8. Governing Law
              </h3>
              <p className="text-base font-normal">
                These Terms of Use will be governed by and construed in
                accordance with the laws of the jurisdiction where the website
                is operated, without regard to its conflict of law principles.
              </p>
            </div>
          </div>
        </section>
      </>
    );
};

export default TermsOfUse;
