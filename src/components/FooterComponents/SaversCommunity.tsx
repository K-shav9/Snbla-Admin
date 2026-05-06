import React from 'react';
import homepageImage from "../../assets/img/Homepage.png";

const SaversCommunity = () => {
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
              <h1 className=" text-center tab:mb-5 mb-3 tab:mt-4 mt-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
                Welcome to the Savers Community!
              </h1>
              <p className="text-base font-normal">
                Join a vibrant community focused on saving money, sharing tips,
                and building financial freedom together.
              </p>

              <div className="container mx-auto max-w-screen-xl text-center mt-5">
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-[rgb(71_77_244)] mb-2">
                      Budgeting Tips
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Learn practical budgeting strategies to manage your
                      finances effectively.
                    </p>
                    <button className="w-full py-2 bg-[rgb(71_77_244)] text-white rounded hover:bg-[rgb(71_77_244_/_0.8)]">
                      Explore More
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-[rgb(71_77_244)] mb-2">
                      Investment Ideas
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Discover smart investment opportunities to grow your
                      savings.
                    </p>
                    <button className="w-full py-2 bg-[rgb(71_77_244)] text-white rounded hover:bg-[rgb(71_77_244_/_0.8)]">
                      Learn More
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-[rgb(71_77_244)] mb-2">
                      Community Stories
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Read inspiring stories from members who achieved financial
                      goals.
                    </p>
                    <button className="w-full py-2 bg-[rgb(71_77_244)] text-white rounded hover:bg-[rgb(71_77_244_/_0.8)]">
                      Get Inspired
                    </button>
                  </div>
                </div>

                <div className="mt-12">
                  <button className="py-3 px-8 bg-yellow-500 text-white rounded-lg text-lg hover:bg-yellow-600 transition-colors">
                    Join the Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6"></section>
      </>
    );
};

export default SaversCommunity;
