"use client";

import Link from "next/link";
import React from "react";

const Signature = () => {
  return (
    <div className="relative flex justify-center items-center pb-8 mb-32 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <Link href="/">
        <p className="font-allison text-6xl text-secondary-foreground">
          Seif Zakaria
        </p>
      </Link>
    </div>
  );
};

export default Signature;
