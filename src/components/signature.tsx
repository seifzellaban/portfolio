"use client";

import Link from "next/link";
import React from "react";

const Signature = () => {
  return (
    <div className="relative flex justify-center items-center pb-8 mb-32 cursor-pointer overflow-hidden">
      <Link href="/">
        <p className="font-allison text-6xl text-secondary-foreground">
          Seif Zakaria
        </p>
      </Link>
    </div>
  );
};

export default Signature;
