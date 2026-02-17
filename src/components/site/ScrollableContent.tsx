"use client";

import { ReactNode } from "react";

interface ScrollableContentProps {
  children: ReactNode;
}

export default function ScrollableContent({ children }: ScrollableContentProps) {
  return (
    <div className="pt-48 pl-12 lg:pl-[200px] pr-12 lg:pr-24">
      <div className="max-w-5xl mx-auto">
        {children}
        <div className="h-32" />
      </div>
    </div>
  );
}
