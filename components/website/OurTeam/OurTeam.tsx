"use client";
import React, { useEffect, useState } from "react";
import TeamCard from "@/components/ui/TeamCard";
import { StaticImageData } from "next/image";

export default function OurTeam() {
  const [users, setUsers] = useState<any>([]);

  const [loading, setLoading] = useState(true); // Loading state

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
      );
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      const data = await response.json();
      const groupByRole = (data: any[]) => {
        return data.reduce((acc, curr) => {
          if (!acc[curr.role]) {
            acc[curr.role] = [];
          }
          acc[curr.role].push(curr);
          return acc;
        }, {});
      };

      const groupedData = groupByRole(data?.data);
      setUsers(groupedData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("users", users);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[70vh]">
        <span className="loader"></span> {/* Global loader */}
      </div>
    );
  }
  return (
    <div className="pb-[5rem] lg:w-11/12 w-11/12 3xl:w-8/12 mx-auto">
      <div className="w-full  mx-auto flex flex-col gap-5">
        <div className="flex md:flex-row flex-col w-full gap-5 lg:mt-16 md:mt-12 mt-8">
          <div className="flex w-full  flex-col gap-5">
            <div>
              <p className="text-secondary-400 md:text-lg sm:text-md text-sm leading-relaxed text-center">
                At Infinity, our team is the heart of what we do. Comprised of
                passionate adventurers, seasoned guides, and travel experts, we
                bring a wealth of knowledge and experience to every journey.
                Each member is dedicated to providing you with the best possible
                experience, from planning your expedition to ensuring your
                safety and enjoyment along the way. With a deep love for
                exploration and a commitment to excellence, our team is here to
                turn your travel dreams into reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  mx-auto md:my-20 sm:my-12 my-8">
        <h2 className="font-extrabold title lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase border-b-4 pb-1 w-fit mx-auto border-primary2/60 ">
          Core Team
        </h2>
        <div className="grid  gap-10 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-10">
          {users["core-team"]?.map(
            (
              teamMember: {
                id: number;
                firstName: string;
                coverPic: string | StaticImageData;
                position: string;
                desc: string;
                socials?: {
                  facebook?: string;
                  instagram?: string;
                };
              },
            ) => (
              <TeamCard
                key={teamMember.id}
                teamMember={teamMember}
                teamType="core-team"
              />
            )
          )}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="font-extrabold title lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase border-b-4 pb-1 w-fit mx-auto border-primary2/60  ">
          Mountain Guides
        </h2>
        <div className="grid  gap-10 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-10">
          {users["expedition-guide"]?.map(
            (
              teamMember: {
                id: number;
                firstName: string;
                coverPic: string | StaticImageData;
                position: string;
                desc: string;
              },
              index: React.Key | null | undefined
            ) => (
              <TeamCard
                key={index}
                teamMember={teamMember}
                teamType="expedition-guide"
              />
            )
          )}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="font-extrabold title lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase border-b-4 pb-1 w-fit mx-auto border-primary2/60  ">
          Trekking Guides
        </h2>
        <div className="grid  gap-10 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-10">
          {users["trekking-guide"]?.map(
            (
              teamMember: {
                id: number;
                firstName: string;
                coverPic: string | StaticImageData;
                position: string;
                desc: string;
              },
              index: React.Key | null | undefined
            ) => (
              <TeamCard
                key={index}
                teamMember={teamMember}
                teamType="trekking-guide"
              />
            )
          )}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="font-extrabold title lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase border-b-4 pb-1 w-fit mx-auto border-primary2/60  ">
          Cook
        </h2>
        <div className="grid gap-10 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-10">
          {users["cook"]?.map(
            (
              teamMember: {
                id: number;
                firstName: string;
                coverPic: string | StaticImageData;
                position: string;
                desc: string;
              },
              index: React.Key | null | undefined
            ) => (
              <TeamCard key={index} teamMember={teamMember} teamType="cook" />
            )
          )}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="font-extrabold title lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase border-b-4 pb-1 w-fit mx-auto border-primary2/60  ">
          Porters
        </h2>
        <div className="grid gap-10 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 my-10">
          {users["porter"]?.map(
            (
              teamMember: {
                id: number;
                firstName: string;
                coverPic: string | StaticImageData;
                position: string;
                desc: string;
              },
              index: React.Key | null | undefined
            ) => (
              <TeamCard key={index} teamMember={teamMember} teamType="porter" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
