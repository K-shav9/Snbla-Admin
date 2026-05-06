import React from 'react';
import homepageImage from "../../assets/img/Homepage.png";

const NewsRoom = () => {
    const newsArticles = [
        {
            title: "Breaking News: Global Market Trends",
            summary: "The latest report highlights the shifting global market trends in 2025. Discover how these trends affect industries worldwide.",
            date: "January 16, 2025",
            link: "#"
        },
        {
            title: "New Innovations in Technology: 2025",
            summary: "Explore the top tech innovations expected to shape the industry this year, from AI to sustainable energy solutions.",
            date: "January 14, 2025",
            link: "#"
        },
        {
            title: "Financial Tips for the New Year",
            summary: "Learn essential financial strategies to kickstart the new year, with tips on budgeting, saving, and investing.",
            date: "January 10, 2025",
            link: "#"
        }
    ];

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
              <h1 className="tab:mb-5 mb-3 tab:mt-4 mt-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
                News Room
              </h1>
              <p className="text-base font-normal">
                Stay up to date with the latest updates and news from around the
                world.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-16 px-6">
          <div className="container mx-auto max-w-screen-xl text-left">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-blue-600 mb-4"></h1>
              <p className="text-lg text-gray-600"></p>
            </header>

            <div className="space-y-8">
              {newsArticles.map((article, index) => (
                <article
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <h3 className="text-lg font-semibold text-black text-left my-3">
                    {article.title}
                  </h3>
                  <p className="text-base font-normal">{article.summary}</p>
                  <p className="text-base font-normal">{article.date}</p>
                  <a
                    href={article.link}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    );
};

export default NewsRoom;
