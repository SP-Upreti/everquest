"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { notFound, useParams } from "next/navigation";
import RelatedBlogs from "@/components/website/BlogDetail/RelatedBlogs";

interface Blog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  banner: StaticImport;
  createdAt: string;
  updatedAt: string;
  blogId: string;
}

const BlogSkeleton = () => {
  return (
    <div className="lg:w-9/12 w-11/12 3xl:w-8/12 mx-auto relative py-[5rem] animate-pulse">
      <div className="w-20 h-8 bg-gray-200 rounded"></div>
      <div className="w-full flex flex-col gap-5 justify-start items-start">
        <div className="w-full flex justify-center mt-6">
          <div className="h-10 bg-gray-200 rounded w-3/4 lg:w-1/2"></div>
        </div>
        <div className="w-full h-[50vh] bg-gray-200 rounded-md"></div>
        <div className="w-full md:w-[70%] mx-auto flex gap-5">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="w-full space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-[90%]"></div>
          <div className="h-4 bg-gray-200 rounded w-[95%]"></div>
          <div className="h-4 bg-gray-200 rounded w-[85%]"></div>
        </div>
      </div>
    </div>
  );
};

export default function BlogDetailMain() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`,
          {
            next: { revalidate: 20 },
          }
        );
        
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        
        const response = await res.json();
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (error) {
    return notFound();
  }

  if (loading || !blog) {
    return (
      <>
        <BlogSkeleton />
        <div className="w-11/12 md:w-10/12 mx-auto">
          <RelatedBlogs id={""} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="lg:w-9/12 w-11/12 3xl:w-8/12 mx-auto relative py-[5rem]">
        <Link href="/blogs" className="w-full flex justify-start">
          <div className="text-zinc-700 z-40 hover:scale-105 duration-300 hover:text-zinc-800 flex justify-center items-center">
            <div className="overflow-hidden title flex justify-center items-center">
              <Icon
                icon="ic:outline-arrow-left"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </div>
            <div className="font-semibold">Back</div>
          </div>
        </Link>
        <div className="w-full flex flex-col gap-5 justify-start items-start">
          <div className="w-full">
            <h1 className="text-2xl lg:text-4xl md:text-3xl w-full text-center relative tracking-wide mt-6 title font-bold text-secondary-500">
              {blog.title}
            </h1>
          </div>
          <Image
            width={1000}
            height={1000}
            src={blog.banner}
            alt={blog.slug}
            className="w-full rounded-md max-h-[70vh] object-cover object-top"
            priority
          />
          <div className="w-full md:w-[100%] mx-auto flex gap-5 justify-start items-center">
            <div className="flex items-center text-[12px] gap-2">
              <Icon icon="uil:calender" />
              <span className="text-left">
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </div>
      <div className="w-11/12 md:w-10/12 mx-auto">
        <RelatedBlogs id={blog.blogId} />
      </div>
    </>
  );
}