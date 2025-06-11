"use client";
import BookForm from "@/components/website/BookForm/BookForm";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function Page({}: Props) {
  const searchParams = useSearchParams();

  const groupDepartureId = searchParams.get("groupDepartureId");
  const slug = searchParams.get("slug");

  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-zinc-100 z-[20] relative">
      <BookForm groupDepartureId={groupDepartureId} slug={slug} />
    </main>
  );
}
