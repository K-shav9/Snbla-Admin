import React, { useEffect } from 'react';
import homepageImage from "../../assets/img/Homepage.png";
import { useLanguagePicker } from '../../hooks/useLanguagePicker';

const PrivacyPolicy = () => {
  const lang = useLanguagePicker();
  useEffect(() => {
        document.title = "Privacy Policy | Snbla";
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
          <div className={`${
              lang === "ar" ? "text-right" : "text-left"
            } max-w-4xl sm:px-4 px-0 mx-auto flex-1`}>
            <h1 className="tab:mb-3 mb-2 tab:mt-4 mt-3 tracking-[1px] xl:text-[40px] lg:text-[35px] md:text-4xl text-2xl lg:font-extrabold font-bold xl:leading-[72px] lg:leading-[52px] text-black">
              Privacy Policy
            </h1>

            <p className="text-base font-normal">
              Snbla Wallet gives your customers more than just rewards—it
              empowers them to save for their next big purchase, with your brand
              supporting them at every step
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              1. Overview
            </h3>
            <p className="text-base font-normal">
              Welcome to our privacy policy page. This document outlines how we
              handle the personal data you provide and explains your rights in
              relation to your information.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              2. Information We Collect
            </h3>
            <p className="text-base font-normal">
              We collect two types of information: personal and non-personal
              data. Personal data includes information such as your name, email,
              and payment details, while non-personal data includes things like
              browsing behavior and device information.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              3. How We Use Your Information
            </h3>
            <p className="text-base font-normal">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To provide and personalize our services.</li>
              <li>To improve user experience and develop new features.</li>
              <li>
                To communicate important updates, offers, and newsletters.
              </li>
              <li>To comply with legal requirements and protect our rights.</li>
            </ul>
            <h3 className="text-xl font-semibold text-black  my-3">
              4. Data Sharing and Disclosure
            </h3>
            <p className="text-base font-normal">
              We do not sell your personal data. However, we may share your data
              with trusted third parties who assist in the operation of our
              website and services. These third parties are required to maintain
              the confidentiality of your information and are prohibited from
              using it for unauthorized purposes.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              5. Cookies and Tracking Technologies
            </h3>
            <p className="text-base font-normal">
              We use cookies and other tracking technologies to enhance your
              experience, analyze trends, and track user activity on our
              website. Cookies help us remember your preferences and provide a
              more personalized browsing experience.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              6. Security of Your Data
            </h3>
            <p className="text-base font-normal">
              We implement reasonable security measures to protect your personal
              data from unauthorized access, alteration, and disclosure.
              However, please be aware that no method of data transmission over
              the internet is 100% secure.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              7. Your Rights
            </h3>
            <p className="text-base font-normal">
              You have the right to access, update, or delete your personal
              data. If you wish to exercise any of these rights, please contact
              us at the details below.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              8. Changes to This Privacy Policy
            </h3>
            <p className="text-base font-normal">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and we will notify you of any
              significant updates via email.
            </p>
            <h3 className="text-xl font-semibold text-black  my-3">
              9. Contact Us
            </h3>
            <p className="text-base font-normal">
              If you have any questions or concerns about this Privacy Policy or
              how we handle your personal information, please contact us at:
            </p>
            <p className="text-base font-normal">Email: privacy@example.com</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;

