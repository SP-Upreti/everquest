"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";
import Button from "./ui/button";
import { useCollections } from "@/context/Collections";
import { useActivities } from "@/context/Activities";
import { IconParachute } from "@tabler/icons-react";

interface Package {
  packageName: string;
  packageImg: StaticImageData;
  packageDesc: string;
  packageDay: string;
}



interface Expedition {
  _id: string;
  name: string;
  subheading?: string;
  maxElevation?: string;
  banner?: string;
  description?: string;
  expeditions?: Expedition[];
  categoryId?: string;
  slug?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  expeditions: Expedition[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  image: any[];
}




interface NavLink {
  id: number;
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface CompanyLink {
  name: string;
  href: string;
}

const NavLinks: NavLink[] = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Mountaineering", href: "/expedition", hasDropdown: true },
  { id: 3, name: "Trekking", href: "/trek", hasDropdown: true },
  { id: 4, name: "Services", href: "", hasDropdown: true },
  { id: 5, name: "Company", href: "", hasDropdown: true },
  { id: 7, name: "Calendar", href: "/calendar" },
  { id: 8, name: "Blogs", href: "/blogs" },
  { id: 9, name: "Contact us", href: "/contact_us" },
];

const CompanyLinks: CompanyLink[] = [
  { name: "About Us", href: "/about_us" },
  { name: "Our team", href: "/our_team" },
  { name: "Message from Founder", href: "/message_from_ceo" },
  { name: "Certificates", href: "/certificates" },
  { name: "Become partner with us", href: "/partner" },
  {
    name: "Useful Information",
    href: "/useful_info/gear-and-equipment-of-trekking-and-mountaineering",
  },
  { name: "Terms & Conditions", href: "/terms" },
];

const aboutlinks = [
  { name: "About us", path: "/about_us" },
  { name: "Our Team", path: "/our_team" },
  { name: "Certificates", path: "/certificates" },
  { name: "Message from CEO", path: "/message_from_ceo" },
  { name: "Be Partner with us", path: "/partner" },
  { name: "Useful Information", path: "/useful_info/travel-guidelines-and-tips" },
  { name: "Terms & Conditions", path: "/terms" },
];


const MockNav = [
  {
    "package": "Mountaineering",
    "subpackages": [
      {
        "title": "Above 8000m",
        "img": "/peaks/everest.png",
        "link": "/mountaineering/above-8000m/everest",
        "location": "Nepal, Everest Region",
        "price": "₹3,50,000",
        "place": "Mount Everest (8848m)"
      },
      {
        "title": "8000m - 8200m",
        "img": "/peaks/manaslu.png",
        "link": "/mountaineering/8000-8200m/manaslu",
        "location": "Nepal, Gorkha Region",
        "price": "₹3,00,000",
        "place": "Manaslu (8163m)"
      },
      {
        "title": "7000m - 8000m",
        "img": "/peaks/dhaulagiri.png",
        "link": "/mountaineering/7000-8000m/dhaulagiri",
        "location": "Nepal, Dhaulagiri Zone",
        "price": "₹2,80,000",
        "place": "Dhaulagiri I (8167m)"
      },
      {
        "title": "6500m - 7000m",
        "img": "/peaks/ama-dablam.png",
        "link": "/mountaineering/6500-7000m/ama-dablam",
        "location": "Nepal, Khumbu Region",
        "price": "₹2,20,000",
        "place": "Ama Dablam (6812m)"
      },
      {
        "title": "6000m - 6500m",
        "img": "/peaks/island-peak.png",
        "link": "/mountaineering/6000-6500m/island-peak",
        "location": "Nepal, Everest Region",
        "price": "₹1,80,000",
        "place": "Island Peak (6189m)"
      }
    ]
  },
  {
    "package": "Trekking",
    "subpackages": [
      {
        "title": "5000m - 6000m",
        "img": "/trek/everest-base-camp.png",
        "link": "/trekking/5000-6000m/everest-base-camp",
        "location": "Nepal, Everest Region",
        "price": "₹1,20,000",
        "place": "Everest Base Camp (5364m)"
      },
      {
        "title": "4500m - 5000m",
        "img": "/trek/gokyo-lake.png",
        "link": "/trekking/4500-5000m/gokyo-lake",
        "location": "Nepal, Gokyo Valley",
        "price": "₹95,000",
        "place": "Gokyo Lake (4790m)"
      },
      {
        "title": "4000m - 4500m",
        "img": "/trek/annapurna-base-camp.png",
        "link": "/trekking/4000-4500m/annapurna-base-camp",
        "location": "Nepal, Annapurna Region",
        "price": "₹85,000",
        "place": "Annapurna Base Camp (4130m)"
      },
      {
        "title": "3500m - 4000m",
        "img": "/trek/langtang-valley.png",
        "link": "/trekking/3500-4000m/langtang-valley",
        "location": "Nepal, Langtang Region",
        "price": "₹70,000",
        "place": "Langtang Valley (3700m)"
      },
      {
        "title": "3000m - 3500m",
        "img": "/trek/poon-hill.png",
        "link": "/trekking/3000-3500m/ghorepani-poonhill",
        "location": "Nepal, Annapurna Region",
        "price": "₹55,000",
        "place": "Poon Hill (3210m)"
      }
    ]
  }
]

const MockServices = [
  {
    "title": "Nepal Tours",
    "desc": "Explore Nepal’s cultural gems, ancient cities, scenic landscapes, and majestic mountains in a soul-refreshing journey.",
    "icon": "/services/tour.svg",
    "link": "/tours/nepal"
  },
  {
    "title": "Bhutan Tours",
    "desc": "Discover Bhutan’s peaceful monasteries, hidden valleys, and the unique charm of the Land of the Thunder Dragon.",
    "icon": "/services/bhutan.svg",
    "link": "/tours/bhutan"
  },
  {
    "title": "Ice Climbing",
    "desc": "Experience frozen waterfalls and icy cliffs with expert guidance and thrilling vertical ascents in icy terrain.",
    "icon": "/services/ice.svg",
    "link": "/adventures/ice-climbing"
  },
  {
    "title": "Rock Climbing",
    "desc": "Challenge yourself on natural rock faces and vertical routes ideal for all climbing skill levels.",
    "icon": "/services/mountain.svg",
    "link": "/adventures/rock-climbing"
  },
  {
    "title": "Heli Tour",
    "desc": "Witness the Himalayas from above with scenic flights to Everest, Annapurna, and remote Buddhist monasteries.",
    "icon": "/services/helicopter.svg",
    "link": "/adventures/heli-tour"
  },
  {
    "title": "Jungle Safari",
    "desc": "Explore Chitwan’s wilderness with jeep or elephant safaris and spot tigers, rhinos, and exotic birds.",
    "icon": "/services/elephant.svg",
    "link": "/adventures/jungle-safari"
  },
  {
    "title": "Rafting",
    "desc": "Navigate white-water rapids on Himalayan rivers like Trishuli and Bhote Koshi for a thrilling adventure.",
    "icon": "/services/tour.svg",
    "link": "/adventures/rafting"
  },
  {
    "title": "Paragliding",
    "desc": "Soar above the hills of Pokhara for breathtaking views of lakes, mountains, and peaceful skies.",
    "icon": <IconParachute />,
    "link": "/adventures/paragliding"
  },
  {
    "title": "Honey Hunting",
    "desc": "Join local Gurung tribes to harvest wild honey from cliffs in a daring age-old Himalayan ritual.",
    "icon": (
      <svg height="64px" width="64px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path className="st0" d="M197.433,150.171c-0.004,14.99,5.655,28.699,14.922,39.047l1.692,1.892h83.901l1.691-1.892 c9.268-10.348,14.927-24.057,14.923-39.047c0.004-16.151-6.563-30.831-17.15-41.418c-4.948-4.946-10.798-9.004-17.269-11.938 l13.34-27.271c2.751-0.43,5.258-2.139,6.574-4.833c2.139-4.375,0.331-9.658-4.044-11.789c-4.372-2.146-9.658-0.33-11.793,4.038 c-1.544,3.158-1.024,6.788,1.027,9.362l-13.436,27.462c-5.036-1.414-10.333-2.18-15.813-2.18c-5.479,0-10.78,0.766-15.816,2.18 L226.752,66.33c2.05-2.582,2.571-6.211,1.027-9.37c-2.138-4.368-7.421-6.183-11.796-4.038c-4.372,2.132-6.183,7.414-4.045,11.789 c1.319,2.694,3.823,4.403,6.574,4.833l13.344,27.271c-6.472,2.934-12.324,6.992-17.27,11.938 C203.996,119.34,197.43,134.02,197.433,150.171z M256,102.943c13.063,0,24.831,5.275,33.396,13.829 c8.556,8.568,13.836,20.336,13.836,33.399c0,11.227-3.912,21.49-10.443,29.6h-73.578c-6.531-8.11-10.438-18.373-10.442-29.6 c0.004-13.063,5.279-24.831,13.832-33.399C231.166,108.218,242.937,102.943,256,102.943z"></path> <path className="st0" d="M104.328,249.564c17.448-0.007,34.781-3.869,49.402-8.469c14.617-4.622,26.498-10.003,32.955-13.224 c5.564-2.786,9.742-6.05,12.587-9.89c1.418-1.913,2.484-3.953,3.173-6.064c0.696-2.103,1.009-4.256,1.009-6.344 c-0.007-4.27-1.266-8.23-3.074-11.789c-1.818-3.56-4.213-6.768-6.795-9.631c-3.254-3.594-7.347-7.379-12.141-11.367 c-8.384-6.95-18.922-14.455-30.655-21.961c-17.596-11.262-37.862-22.496-57.431-31.598c-9.781-4.552-19.39-8.568-28.426-11.783 c-9.038-3.207-17.498-5.62-25.076-6.942h0.004c-2.41-0.416-5.244-0.718-8.329-0.718c-3.221,0-6.717,0.324-10.259,1.246 c-2.651,0.696-5.332,1.73-7.874,3.25c-3.816,2.257-7.316,5.683-9.704,10.284C1.291,119.172-0.004,124.841,0,131.587 c0,4.031,0.454,8.469,1.414,13.372c0.37,1.892,0.978,4.382,1.84,7.428c3.028,10.629,9.221,27.926,19.308,45.089 c5.044,8.575,11.068,17.114,18.209,24.732c7.143,7.619,15.419,14.322,24.968,19.098C77.812,247.342,91.135,249.564,104.328,249.564 z M46.342,211.46c-10.608-12.205-18.672-27.068-24.243-40.06c-2.789-6.499-4.963-12.528-6.549-17.501 c-1.586-4.966-2.585-8.94-3.011-11.114c-0.844-4.305-1.203-8.019-1.203-11.198c0-4.741,0.799-8.23,1.956-10.833 c0.876-1.963,1.948-3.44,3.19-4.657c1.854-1.808,4.15-3.039,6.774-3.841c2.613-0.809,5.522-1.139,8.275-1.132 c2.343-0.007,4.573,0.232,6.381,0.548l0.017,0.007c10.178,1.759,23.23,6.036,37.25,11.902 c21.054,8.786,44.372,21.116,64.532,33.651c10.076,6.267,19.376,12.584,27.194,18.514c7.822,5.916,14.177,11.473,18.275,16.01 c2.072,2.286,3.883,4.769,5.1,7.175c1.231,2.406,1.846,4.678,1.84,6.641c0,0.97-0.141,1.878-0.44,2.799 c-0.457,1.379-1.284,2.814-2.852,4.41c-1.565,1.584-3.893,3.293-7.213,4.952c-5.99,2.997-17.417,8.167-31.299,12.542 c-13.875,4.389-30.226,7.962-45.986,7.955c-11.934,0-23.47-2.033-33.518-7.062C61.57,226.549,53.404,219.613,46.342,211.46z"></path> <path className="st0" d="M195.622,254.636c1.801-5.719,3.049-10.474,3.738-13.935l-11.114-2.216c-0.377,1.892-1.02,4.523-1.914,7.668 c-3.122,11.022-9.295,28.249-17.997,44.625c-4.35,8.195-9.327,16.179-14.817,23.086c-5.49,6.915-11.484,12.718-17.74,16.664 c-8.845,5.592-19.112,8.23-28.911,8.23c-7.586,0-14.86-1.59-20.881-4.453c-3.011-1.428-5.712-3.172-8.008-5.177 c-2.297-1.998-4.196-4.255-5.649-6.746c-2.979-5.107-4.491-11.269-4.494-18.106c-0.004-7.4,1.793-15.553,5.311-23.628 c3.514-8.082,8.74-16.087,15.468-23.22l-8.251-7.78c-7.614,8.09-13.551,17.142-17.61,26.47c-4.055,9.334-6.246,18.943-6.254,28.158 c0,8.497,1.892,16.706,6.039,23.818c2.121,3.644,4.847,6.851,7.994,9.58c4.734,4.122,10.404,7.21,16.587,9.278 c6.183,2.075,12.887,3.144,19.748,3.144c11.807-0.007,24.127-3.151,34.964-9.988c8.807-5.571,16.432-13.526,23.107-22.51 c9.999-13.485,17.874-29.346,23.649-43.513C191.475,267.01,193.821,260.355,195.622,254.636z"></path> <path className="st0" d="M509.063,116.14c-1.435-3.222-3.376-5.966-5.627-8.153c-3.39-3.312-7.407-5.367-11.382-6.577 c-3.988-1.217-7.963-1.625-11.589-1.625c-3.084,0-5.92,0.303-8.325,0.718c-11.536,2.018-25.162,6.555-39.687,12.612 c-21.771,9.102-45.49,21.652-66.146,34.496c-10.33,6.415-19.889,12.901-28.06,19.098c-8.181,6.197-14.958,12.064-19.833,17.444 c-2.585,2.863-4.977,6.071-6.799,9.631c-1.804,3.559-3.067,7.519-3.073,11.789c0,2.089,0.316,4.241,1.012,6.344 c1.034,3.166,2.916,6.176,5.554,8.835c2.645,2.673,6.028,5.029,10.207,7.119c6.458,3.221,18.338,8.602,32.955,13.224 c14.617,4.6,31.953,8.462,49.398,8.469c13.192,0,26.515-2.223,38.593-8.258c10.913-5.459,20.16-13.435,27.961-22.418 c11.691-13.485,20.188-29.284,26.094-43.014c2.95-6.873,5.244-13.232,6.936-18.535c1.692-5.325,2.775-9.56,3.331-12.38 c0.96-4.902,1.418-9.341,1.418-13.372C512,125.586,510.979,120.444,509.063,116.14z M499.457,142.785 c-0.281,1.442-0.819,3.707-1.618,6.506c-2.789,9.834-8.743,26.421-18.173,42.438c-4.709,8.012-10.284,15.883-16.71,22.728 c-6.426,6.851-13.685,12.669-21.768,16.713c-10.048,5.029-21.584,7.062-33.521,7.062c-15.76,0.007-32.108-3.566-45.986-7.955 c-13.879-4.376-25.306-9.545-31.295-12.542c-4.436-2.216-7.077-4.502-8.55-6.492c-0.742-1.012-1.214-1.948-1.52-2.87 c-0.296-0.921-0.436-1.829-0.44-2.799c-0.004-1.963,0.609-4.235,1.842-6.641c1.218-2.406,3.029-4.888,5.097-7.175 c2.733-3.017,6.471-6.506,10.973-10.242c7.882-6.534,18.096-13.829,29.526-21.144c17.15-10.974,37.053-22.018,56.102-30.866 c9.521-4.432,18.828-8.315,27.444-11.374c8.614-3.06,16.548-5.296,23.223-6.458c1.811-0.316,4.038-0.555,6.38-0.548 c2.448-0.007,5.019,0.253,7.393,0.879c1.786,0.464,3.454,1.126,4.938,2.012c2.219,1.337,4.038,3.102,5.458,5.796 c1.404,2.694,2.406,6.444,2.406,11.776C500.664,134.766,500.302,138.48,499.457,142.785z"></path> <path className="st0" d="M429.115,249.649l-8.251,7.78c6.732,7.132,11.951,15.138,15.468,23.22c3.52,8.083,5.314,16.228,5.314,23.628 c-0.004,6.844-1.52,12.999-4.499,18.106c-1.452,2.49-3.348,4.748-5.648,6.746c-3.44,3.004-7.801,5.423-12.743,7.084 c-4.941,1.653-10.456,2.546-16.147,2.546c-9.798,0-20.061-2.638-28.914-8.23c-7.147-4.502-13.952-11.451-20.051-19.682 c-9.17-12.338-16.745-27.49-22.257-41.038c-2.757-6.774-5.012-13.147-6.721-18.57c-1.706-5.416-2.866-9.911-3.439-12.753 l-11.111,2.216c0.461,2.307,1.168,5.184,2.124,8.554c3.342,11.748,9.697,29.516,18.891,46.848 c4.597,8.652,9.904,17.198,15.957,24.816c6.056,7.612,12.852,14.322,20.558,19.19c10.836,6.837,23.161,9.981,34.964,9.988 c9.151-0.007,18.018-1.885,25.745-5.557c3.862-1.829,7.439-4.121,10.59-6.865c3.151-2.729,5.874-5.936,7.994-9.58 c4.147-7.104,6.039-15.32,6.039-23.818c-0.004-9.215-2.198-18.824-6.25-28.151C442.667,266.791,436.73,257.738,429.115,249.649z"></path> <path className="st0" d="M218.845,198.665c-2.94-0.007-5.651,1.203-7.572,3.13c-1.928,1.92-3.138,4.635-3.134,7.568v32.118 c-0.004,2.948,1.206,5.656,3.134,7.569c1.92,1.935,4.632,3.144,7.572,3.144h74.31c2.94,0,5.652-1.21,7.572-3.144 c1.924-1.913,3.134-4.621,3.134-7.569v-32.118c0-2.933-1.21-5.648-3.134-7.568c-1.92-1.927-4.632-3.138-7.572-3.13H218.845z"></path> <path className="st0" d="M318.094,291.862c-1.199-3.286-2.455-6.422-3.752-9.384c-3.152-7.209-6.464-13.386-9.363-18.127 c-1.446-2.37-2.792-4.403-3.992-6.042c-0.59-0.816-1.157-1.541-1.698-2.188c-0.528-0.654-1.034-1.209-1.6-1.751l-7.794,8.237 c0.073,0.064,0.338,0.338,0.678,0.753c0.644,0.788,1.572,2.033,2.656,3.63c1.874,2.814,4.22,6.711,6.626,11.402 c2.054,3.967,4.158,8.526,6.123,13.471h-99.957c0.665-1.66,1.334-3.286,2.03-4.847c2.922-6.71,6.017-12.471,8.638-16.762 c1.312-2.146,2.507-3.926,3.478-5.262c0.489-0.668,0.918-1.217,1.259-1.632c0.342-0.415,0.602-0.689,0.679-0.766l-7.794-8.209 c-0.57,0.528-1.072,1.083-1.614,1.737c-0.996,1.21-2.103,2.716-3.338,4.559c-2.167,3.221-4.685,7.456-7.294,12.52 c-2.768,5.381-5.627,11.691-8.17,18.662c-1.045,2.877-2.041,5.859-2.951,8.947c-1.812,6.113-3.299,12.592-4.218,19.316 c-0.678,4.903-1.072,9.897-1.072,14.99c0,4.32,0.282,8.695,0.897,13.07c0.138,0.977,0.289,1.934,0.44,2.877 c2.093,12.542,5.905,23.178,10.741,32.111c1.097,2.047,2.258,3.995,3.454,5.873c5.138,7.984,11.057,14.406,17.016,19.499 c8.969,7.654,18.025,12.374,24.876,15.187c2.606,1.076,4.885,1.87,6.735,2.448l4.64,31.309c0.211,1.435,1.442,2.49,2.884,2.49 c1.446,0,2.673-1.056,2.887-2.49l4.78-32.259c0.552-0.19,1.126-0.401,1.713-0.626c8.452-3.222,21.286-9.581,33.001-21.602 c5.261-5.395,10.301-11.951,14.547-19.829c0.478-0.865,0.932-1.758,1.382-2.659c4.185-8.357,7.484-18.127,9.363-29.452 c0.148-0.942,0.302-1.9,0.439-2.877c0.616-4.375,0.897-8.75,0.897-13.07c0-5.093-0.394-10.101-1.076-15.004 C323.873,310.017,321.218,300.436,318.094,291.862z M286.43,399.928c-7.822,6.69-15.82,10.847-21.816,13.316 c-3.01,1.231-5.504,2.04-7.217,2.532c-0.542,0.162-1.006,0.288-1.382,0.38c-3.532-0.893-15.039-4.361-26.843-13.33 c-6.348-4.811-12.796-11.184-18.264-19.653h90.182C296.654,390.038,291.579,395.531,286.43,399.928z M314.229,346.608 c-0.215,1.52-0.468,3.004-0.749,4.453H198.502c-0.274-1.449-0.517-2.933-0.732-4.453c-0.542-3.826-0.781-7.667-0.781-11.494 c0-3.728,0.229-7.449,0.658-11.135h116.694c0.436,3.686,0.665,7.408,0.665,11.135C315.006,338.941,314.771,342.782,314.229,346.608 z"></path> </g> </g></svg>
    ),
    "link": "/adventures/honey-hunting"
  }
]

const companyImages = [
  "/company/about.jpeg",
  "/company/team.jpg",
  "/company/ceo.jpg",
  "/company/certificate.jpg",
  "/company/partner.jpg",
  "/company/information.jpg",
]




export default function Nav() {
  const pathname = usePathname();
  const { collections } = useCollections();
  const { activities } = useActivities();

  // Unified state management
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [hoveredData, setHoveredData] = useState<Expedition[]>([]);
  const [hoveredPackage, setHoveredPackage] = useState<string>("");
  const [hoveredLink, setHoveredLink] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [organizedData, setOrganizedData] = useState<Record<string, Expedition[]>>({
    mountaineering: [],
    trekking: [],
  });

  // Handle all dropdowns with single function
  const toggleDropdown = (type: string) => {
    setActiveDesktopDropdown(activeDesktopDropdown === type ? null : type);
    setHoveredLink(type);
  };

  // Handle mobile dropdowns
  const toggleMobileDropdown = (type: string) => {
    setActiveMobileDropdown(activeMobileDropdown === type ? null : type);
  };

  // Reset all states on route change
  const resetStates = useCallback(() => {
    setActiveDesktopDropdown(null);
    setActiveMobileDropdown(null);
    setHoveredData([]);
    setHoveredPackage("");
    setHoveredLink("");
    setIsMobileNavOpen(false);
  }, []);

  // Handle hover events
  const handleHoverLink = useCallback((link: string) => {
    setHoveredLink(link);

    const dropdownTypes: Record<string, string> = {
      "Mountaineering": "mountaineering",
      "Trekking": "trekking",
      "Other Activities": "other_activities",
      "Company": "company",
      "Services": "services"
    };

    const dropdownType = dropdownTypes[link];
    if (dropdownType) {
      setActiveDesktopDropdown(dropdownType);

      if (["mountaineering", "trekking", "other_activities"].includes(dropdownType)) {
        const linkData = organizedData[dropdownType] || [];
        setHoveredData(linkData[0]?.expeditions || []);
      }
    }
  }, [organizedData]);

  // Organize data from context
  useEffect(() => {
    if (!collections?.length) return;

    const organized: Record<string, Expedition[]> = {};
    collections.forEach((item) => {
      if (!item.collections) return;

      const collectionName = item.collections.name.toLowerCase();
      if (!organized[collectionName]) {
        organized[collectionName] = [];
      }

      organized[collectionName].push({
        // id: item.categoryId,
        name: item.name,
        slug: item.slug,
        description: item.description,
        image: item.image,
        // expeditions: item.expeditions,
        _id: item._id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    setOrganizedData(organized);
  }, [collections]);

  // Handle scroll and route changes
  useEffect(() => {
    resetStates();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, resetStates]);

  // Update navbar background
  useEffect(() => {
    const bgColor =
      pathname.startsWith("/expedition") ||
        pathname.startsWith("/trek") ||
        pathname.startsWith("/customizetrip") ||
        pathname.startsWith("/partner") ||
        pathname.startsWith("/detailspage") ||
        pathname.startsWith("/blog_detail") ||
        pathname.startsWith("/calendar") ||
        pathname.startsWith("/blogs") ||
        pathname.startsWith("/booking") ||
        pathname.startsWith("/contact_us") ||
        pathname.startsWith("/other_activities")
        ? "#000000"
        : isScrolled ? "#121212" : "";

    gsap.to(".navbar", { backgroundColor: bgColor, duration: 0.5 });
  }, [isScrolled, pathname]);

  // Animation variants
  const mobileNavVariants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };

  // Derive current packages based on active dropdown
  const currentPackages = organizedData[activeDesktopDropdown || ""] || [];

  // Check if navbar should have dark background
  const shouldHaveDarkBg =
    activeDesktopDropdown ||
    pathname.includes("/message_from_ceo") ||
    pathname.includes("/blogs/") ||
    pathname.includes("/profile/");

  return (
    <div
      onMouseLeave={resetStates}
      className={`navbar w-full z-[99999] ${shouldHaveDarkBg ? "bg-[#121212]" : "bg-transparent"
        } fixed top-0 left-0 z-[100] h-[4rem]`}
    >
      <div className="w-11/12 text-sm flex justify-between items-center mx-auto h-full">
        {/* Desktop Dropdown Menu */}
        {["mountaineering", "trekking", "other_activities"].includes(activeDesktopDropdown || "") && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute border-zinc-700 border-opacity-50 w-full z-10 bg-[#121212] shadow-lg top-full left-0 text-zinc-50"
            >
              <div className="w-11/12 py-8 pb-16 mx-auto ">

                {activeDesktopDropdown == "mountaineering" ? (
                  <div className="">

                    <div className="mt-4 flex gap-4 items-center flex-wrap">
                      {MockNav[0].subpackages.map((data, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            duration: 0.1
                          }}
                          className="h-80 w-64 relative bg-white/10 rounded-lg overflow-hidden ">
                          <Image fill quality={50} src={data.img} alt={data.title} className="object-cover object-center -z-10" />
                          <div className="h-full z-[99] flex flex-col justify-between w-full p-4 bg-black/60">
                            <div className="">
                              <h2 className="text-xl font-semibold">{data.place}</h2>
                              <p>{data.location}</p>
                            </div>
                            <div className="flex justify-end items-center">
                              <button className="size-10 rounded-full flex justify-center items-center border"><ArrowRight /></button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-16 py-10 flex justify-end items-center">
                      <button className="flex gap-4 items-center bg-white/10 px-6 py-2 rounded-lg ">View All <ArrowRight /></button>
                    </div>
                  </div>
                ) : (
                  <div className="">

                    <div className="mt-4 flex gap-4 items-center flex-wrap">
                      {MockNav[1].subpackages.map((data, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            duration: 0.1
                          }}
                          className="h-80 w-64 relative bg-white/10 rounded-lg overflow-hidden ">
                          <Image fill quality={50} src={data.img} alt={data.title} className="object-cover object-center -z-10" />
                          <div className="h-full z-[99] flex flex-col justify-between w-full p-4 bg-black/60">
                            <div className="">
                              <h2 className="text-xl font-semibold">{data.place}</h2>
                              <p>{data.location}</p>
                            </div>
                            <div className="flex justify-end items-center">
                              <button className="size-10 rounded-full flex justify-center items-center border"><ArrowRight /></button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-16 py-10 flex justify-end items-center">
                      <button className="flex gap-4 items-center bg-white/10 px-6 py-2 rounded-lg ">View All <ArrowRight /></button>
                    </div>
                  </div>
                )}




              </div>
            </motion.div>
          </AnimatePresence>
        )}

        <Link href="/">
          <Image
            src="/logo2.png"
            width={96}
            height={12}
            className="w-[13rem]"
            alt="logo"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex gap-5  justify-center items-center">
          {NavLinks.map((link) => (
            <div key={link.id} className="">
              <span
                onMouseEnter={() => handleHoverLink(link.name)}

                className={`nav-links ${pathname === link.href ? "text-purple-500" : "text-zinc-300"
                  } font-semibold items-center hover:text-purple-500 cursor-pointer flex gap-1`}
              >
                {link.name}
                {link.hasDropdown && <Icon icon="iconamoon:arrow-down-2" />}
              </span>

              {link.name === "Company" && activeDesktopDropdown === "company" && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute border-zinc-700 p-16 border-opacity-50 w-full z-10 bg-[#121212] shadow-lg top-full left-0 text-zinc-50"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {CompanyLinks.slice(0, 6).map((companyLink, idx) => (
                        <motion.div

                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            duration: 0.1
                          }}

                          key={companyLink.name}
                          className=""
                        >
                          <div className="h-36 cursor-pointer group relative rounded-lg overflow-hidden flex justify-center items-center bg-[#ffffff03]">
                            <Image fill src={companyImages[idx]} alt={companyLink.name} className="object-cover -z-10 opacity-35 blur-[2px]" />
                            <h2 className="text-xl group-hover:underline transition-all duration-500  font-semibold">{companyLink.name}</h2>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className=" py-10 flex justify-end items-center">
                      <button className="flex gap-4 items-center bg-white/10 px-6 py-2 rounded-lg ">View All <ArrowRight /></button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}



              {link.name === "Services" && activeDesktopDropdown === "services" && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute  gap-3 bg-[#121212] flex flex-col shadow-lg justify-center w-full items-start p-16 mt-3 origin-top  left-0"
                  >

                    <div className="grid grid-cols-3 gap-6 w-full ">
                      {MockServices.slice(0, 6).map((data, idx) => (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                            duration: 0.1
                          }}
                          className="flex gap-4  p-4 rounded-lg bg-[#ffffff03]" key={idx}>
                          <div className=" relative p-2  w-[20%]">
                            <div className="size-16 rounded-md bg-white/10"></div>
                          </div>
                          <div className="w-[75%]">
                            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                            <p className="mb-3">{data.desc}</p>

                            <div className="flex justify-end items-center">
                              <Link href={"/"} className="">View More</Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="px- py-10 flex justify-end w-full items-center">
                      <button className="flex gap-4 items-center bg-white/10 px-6 py-2 rounded-lg ">View All <ArrowRight /></button>
                    </div>


                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          ))}

          <Link href="/customizetrip" className="xl:ml-8">
            <button className="!px-6 !py-3 !text-sm flex gap-2 bg-[#DFB6FF] text-black  items-center rounded-full">Customize Trip </button>
          </Link>
        </div>




        {/* Mobile Navigation Toggle */}
        <Menu
          className="text-slate-50 xl:hidden cursor-pointer"
          onClick={() => setIsMobileNavOpen(true)}
        />

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileNavVariants}
              className="xl:hidden fixed top-0 right-0 h-screen w-full bg-[#121212] z-[9999] overflow-auto"
            >
              <div className="p-5 flex justify-between items-center">
                <Image
                  src="/logo/favicon.png"
                  width={96}
                  height={12}
                  className="w-[2rem]"
                  alt="Logo"
                />
                <X
                  className="text-slate-50 cursor-pointer"
                  onClick={() => setIsMobileNavOpen(false)}
                />
              </div>

              <div className="flex flex-col gap-4 p-5">
                <nav className="text-white font-semibold text-xl space-y-4">
                  <Link href="/">
                    <h2>Home</h2>
                  </Link>

                  {[
                    { name: "Mountaineering", key: "mountaineering" },
                    { name: "Trekking", key: "trekking" },
                    { name: "Company", key: "company" },
                    { name: "Services", key: "services" },
                  ].map((section) => (
                    <div key={section.key} className="border-b border-white/50 pb-2">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleMobileDropdown(section.key)}
                      >
                        <h2>{section.name}</h2>
                        <Image
                          src="/drop.png"
                          alt={section.name}
                          width={24}
                          height={24}
                          className={`transition-transform duration-300 ${activeMobileDropdown === section.key ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${activeMobileDropdown === section.key ? "max-h-96" : "max-h-0"
                          }`}
                      >
                        <div className="pl-4 mt-2 text-[16px] flex flex-col">
                          {section.key === "company" && aboutlinks.map(item => (
                            <Link key={item.name} href={"#"}>{item.name}</Link>
                          ))}

                          {section.key === "services" && activities?.map(item => (
                            <Link key={item._id} href={`#`}>
                              {item.name}
                            </Link>
                          ))}



                          {["mountaineering", "trekking"].includes(section.key) &&
                            organizedData[section.key]?.map(item => (
                              <Link
                                key={item._id}
                                href={`#`}
                              >
                                {item.name}
                              </Link>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))}

                  <Link href="#">
                    <h2 className="border-b border-white/50 pb-2">Calendar</h2>
                  </Link>
                  <Link href="#">
                    <h2 className="border-b border-white/50 pb-2">Blogs</h2>
                  </Link>
                  <Link href="#">
                    <h2 className="border-b border-white/50 pb-2">Contact</h2>
                  </Link>
                  <Link href="#">
                    <Button className="mt-4">Customize your Trip</Button>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </div >
  );
}