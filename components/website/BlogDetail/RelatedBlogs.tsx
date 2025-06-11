"use client"
import { useBlog } from "@/context/Blog";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  id: string;
};

function RelatedBlogs({ id }: Props) {
  console.log("id", id);
  const { blog } = useBlog();
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full md:w-10/12 mx-auto flex gap-5 flex-col pb-[5rem]">
      <h1 className="text-2xl md:text-4xl w-full text-center relative tracking-wide mt-10 title font-bold text-secondary-500">
        RELATED BLOGS
      </h1>
      <div className="grid w-full justify-center grid-cols-1 place-content-center items-center place-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {blog
          .filter((item, index) => {
            return item.blogId !== id;
          })
          .slice(0, 3)
          .map((item, index) => (
            <Link
              key={item.blogId}
              rel="noopener noreferrer"
              href={`/blogs/${item.blogId}`}
              className={`w-full p-4 border rounded-md mx-auto group relative duration-200 hover:no-underline shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:no-underline outline-none dark:bg-gray-50 `}
            >
              <div className="space-y-6">
                <h3 className="text-xl font-medium tracking-wide group-hover:underline group-focus:underline title h-14">
                  {item.title.slice(0, 80)}....
                </h3>

                <div className="text-sm font-medium text-secondary-400">
                  {item.description.slice(0, 150).replace(/<[^>]+>/g, "")} ...
                </div>

                <span className="text-xs text-secondary-500 font-medium">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="w-full h-[30vh] overflow-hidden mt-4 rounded-md">
                <Image
                  alt=""
                  width={1000}
                  height={1000}
                  role="presentation"
                  className="object-cover w-full h-full group-hover:scale-105 duration-200"
                  src={item.banner}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default RelatedBlogs;

const BlogData = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 21, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1523506591153-1504ba186b3b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 22, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "In usu laoreet repudiare legendos",
    date: "January 23, 2021",
    description:
      "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  },
  //   {
  //     id: 4,
  //     imageSrc:
  //       "https://images.unsplash.com/photo-1642933196504-62107dac9258?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?4",
  //     title: "In usu laoreet repudiare legendos",
  //     date: "January 24, 2021",
  //     description:
  //       "Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.",
  //   },
];
