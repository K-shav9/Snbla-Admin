import React from 'react';

const Career = () => {
    const jobOpenings = [
        {
            title: 'Frontend Developer',
            location: 'Remote',
            type: 'Full-time',
            description: 'Seeking a React developer with 2+ years of experience to build responsive web applications.'
        },
        {
            title: 'Backend Engineer',
            location: 'New York, NY',
            type: 'Full-time',
            description: 'Looking for a Node.js developer experienced in building scalable APIs.'
        },
        {
            title: 'UI/UX Designer',
            location: 'San Francisco, CA',
            type: 'Contract',
            description: 'Creative designer needed to craft user-friendly interfaces and experiences.'
        }
    ];

    return (
      <div>
        <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white xl:pt-48 md:pt-32 pt-24 pb-40">
          <div className="container mx-auto max-w-screen-xl flex flex-col items-center gap-14 px-4">
            <h1 className="tab:mb-5 mb-3 tab:mt-4 mt-3 xl:text-[60px] lg:text-[40px] md:text-4xl text-2xl lg:font-extrabold font-bold  xl:leading-[72px] lg:leading-[52px] text-black tracking-[-1px]">
              Join Our Team
            </h1>
            <p className="text-lg text-center max-w-2xl">
              We are a team of innovators passionate about building impactful
              solutions. Explore our open positions and be part of our journey.
            </p>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
              {jobOpenings.map((job, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-sm text-gray-600">
                    Location: {job.location}
                  </p>
                  <p className="text-sm text-gray-600">Type: {job.type}</p>
                  <p className="text-sm text-gray-700 my-4">
                    {job.description}
                  </p>
                  <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg">
                Dont see a role that fits? Send us your resume at{" "}
                <a
                  href="mailto:careers@example.com"
                  className="text-blue underline"
                >
                  careers@example.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Career;
