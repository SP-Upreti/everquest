"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface InfoContent {
  title: string;
  content: string;
}

export default function UsefulInfoPage() {
  const { slug } = useParams();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;
  const [data, setData] = useState<InfoContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendUrl}/api/useful-info/slug/${slug}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, backendUrl]);

  if (isLoading) {
    return <div className="space-y-20"></div>;
  }

  if (error || !data) {
    return (
      <div className="space-y-20">
        <div>
          <h2 className="font-bold title lg:text-2xl md:text-xl text-md uppercase border-b-4 pb-1 mb-8 w-fit border-primary2/60">
            Page Not Found
          </h2>
          <p>{error || "The requested information page could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      <div>
        <h2 className="font-bold title lg:text-2xl md:text-xl text-md uppercase border-b-4 pb-1 mb-8 w-fit border-primary2/60">
          {data.title}
        </h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </div>
  );
}
