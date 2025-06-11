import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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

async function getBlogPosts(): Promise<Blog[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
async function Blogs() {
  const blog = await getBlogPosts();

  return (
    <div>
      <div className="py-[5rem]">
        <div className="lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto space-y-6 sm:space-y-12">
          <div className="grid justify-center grid-cols-1 place-content-center gap-8 items-center place-items-center sm:grid-cols-2 lg:grid-cols-3">
            {blog?.map((item) => (
              <Link
                key={item.blogId}
                rel="noopener noreferrer"
                href={`/blogs/${item.slug}`}
                className={`w-full p-4 rounded-md mx-auto group relative duration-200 hover:no-underline shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] focus:no-underline dark:bg-gray-50 `}
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
                <div className="w-full h-[40vh] overflow-hidden mt-4 rounded-md">
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
      </div>
    </div>
  );
}

export default Blogs;
