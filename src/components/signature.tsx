"use client";

import Link from "next/link";
import React from "react";

const Signature = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden pb-12 sm:pb-16 sm:mb-8">
      <Link href="/" className="px-4 py-2">
        <p className="font-allison text-5xl text-secondary-foreground sm:text-6xl">
          Seif Zakaria
        </p>
      </Link>
    </div>
  );
};

export default Signature;
