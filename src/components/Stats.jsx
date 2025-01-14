"use client";

import { fetchGithubCommits, invalidateCommitsCache } from "@/utils/github";
import CountUp from "react-countup";
import React, { useEffect, useState, useRef } from "react";

const Stats = () => {
  const [commits, setCommits] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const getCommits = async () => {
      try {
        invalidateCommitsCache("seifzellaban");
        const count = await fetchGithubCommits("seifzellaban");
        setCommits(parseInt(count));
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching commits:", error);
        setIsDataFetched(true);
      }
    };
    getCommits();
  }, []);

  useEffect(() => {
    if (!isDataFetched) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startCounting) {
          setStartCounting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.2, // 20% of the section needs to be visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isDataFetched, startCounting]);

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
    <section ref={sectionRef} className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                {startCounting ? (
                  <CountUp
                    start={0}
                    end={item.num}
                    duration={5}
                    delay={0.3}
                    className="text-4xl xl:text-6xl font-extrabold"
                  />
                ) : (
                  <div className="text-4xl xl:text-6xl font-extrabold">0</div>
                )}
                <p className="max-w-[150px] leading-snug text-white/80">
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
