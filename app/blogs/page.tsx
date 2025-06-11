import BlogMain from "@/components/website/Blogs/BlogMain";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="bg-white z-[20] relative">
      <BlogMain />
    </main>
  );
}
