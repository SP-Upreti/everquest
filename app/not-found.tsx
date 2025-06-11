import Link from "next/link";
import react from "react";

export default function NotFound() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="absolute bg-[#1E1E1E] h-16 inset-0 w-full"></div>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="text-center">
          <h2 className="title font-extrabold lg:text-[15vw] text-8xl leading-2 dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-xl font-bold my-10 md:text-4xl md:w-[70%] mx-auto">
            Sorry, we couldn't find the page you are looking for.
          </p>
          {/* <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p> */}
          <Link
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 mt-8 font-semibold rounded bg-primary2 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
