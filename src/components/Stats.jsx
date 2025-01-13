"use client";

import { fetchGithubCommits, invalidateCommitsCache } from "@/utils/github";
import CountUp from "react-countup";
import React, { useEffect, useState } from "react";

const Stats = () => {
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    const getCommits = async () => {
      try {
        invalidateCommitsCache("seifzellaban");
        const count = await fetchGithubCommits("seifzellaban");
        setCommits(parseInt(count));
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };
    getCommits();
  }, []);

  const stats = [
    {
      num: 1,
      text: "Year of experience",
    },
    {
      num: 3,
      text: "Projects completed",
    },
    {
      num: 4,
      text: "Technologies mastered",
    },
    {
      num: commits,
      text: "Code commits",
    },
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold"
                />
                <p
                  className={`max-w-[150px] leading-snug text-white/80`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
