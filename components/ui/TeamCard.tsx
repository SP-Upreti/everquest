import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type TeamMember = {
  id: number;
  firstName: string;
  lastName?: string;
  coverPic: string | StaticImageData;
  position: string;
  desc: string;
  socials?: {
    facebook?: string;
    instagram?: string;
  };
};

type TeamCardProps = {
  teamMember: TeamMember;
  teamType: string; // Add teamType prop
};

const TeamCard = ({ teamMember, teamType }: TeamCardProps) => {
  // console.log(teamMember, "teamMember");
  console.log("facebook", teamMember.socials?.facebook);
  return (
    <main>
      {/* Card Section */}
      <div className="relative group h-[60vh] cursor-pointer">
        <div className="absolute md:group-hover:opacity-[0.5] duration-300 top-0 opacity-0 left-0 w-full h-[60vh] bg-black"></div>
        <div className="absolute bottom-4 opacity-0 duration-300 md:group-hover:opacity-[1] left-0 w-full px-5 text-secondary-50">
          <p>{teamMember.firstName}</p>
        </div>

        <Image
          width={1000}
          height={1000}
          src={teamMember.coverPic}
          alt="banner-image"
          className="h-[60vh] w-full object-cover rounded-md"
        />

        {/* Conditionally render social media icons for core-team only */}
        {teamType === "core-team" && (
          <div className="flex items-center gap-2 absolute bottom-4 right-4 opacity-0 duration-300 md:group-hover:opacity-[1]">
            <a target="_blank" href={teamMember?.socials?.facebook || "#"}>
              <Image
                width={1000}
                height={1000}
                src="/icons/facebook.png"
                alt="facebook-icon"
                className="h-8 w-8"
              />
            </a>
            <a target="_blank" href={teamMember?.socials?.instagram || "#"}>
              <Image
                width={1000}
                height={1000}
                src="/icons/insta.png"
                alt="instagram-icon"
                className="h-8 w-8"
              />
            </a>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 px-2 my-4">
        <span className="font-semibold uppercase tracking-wide title text-start">
          {teamMember.firstName} {teamMember.lastName}
        </span>
        <span className="text-[14px] italic text-secondary-500 text-end">
          {teamMember.position}
        </span>
      </div>
    </main>
  );
};

export default TeamCard;
