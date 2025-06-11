import everestBanner from "@/public/trek/everest-base-camp.png";
import annapurnaBanner from "@/public/trek/annapurna-base-camp.png";
import langtangBanner from "@/public/trek/manaslu.jpg";
import manasluBanner from "@/public/trek/poon-hill.png";
import dhaulagiriBanner from "@/public/trek/poon-hill.png";
import makaluBanner from "@/public/trek/manaslu.jpg";
import { HeroItem } from "@/app/actions/fecth.actions";

export const heroItems: HeroItem[] = [
    {
        _id: "1",
        name: "Everest Base Camp",
        overview: "Trek through the footsteps of legends to the base of the world's tallest mountain.",
        height: "5,364 m",
        banner: everestBanner,
        expeditionId: "exp001",
        collections: { slug: "everest-base-camp" },
        slug: "everest-base-camp",
        maxElevation: "5,364 m",
    },
    {
        _id: "2",
        name: "Annapurna Circuit",
        overview: "Circle the majestic Annapurna range with diverse landscapes and rich culture.",
        height: "5,416 m",
        banner: annapurnaBanner,
        expeditionId: "exp002",
        collections: { slug: "annapurna-circuit" },
        slug: "annapurna-circuit",
        maxElevation: "5,416 m"
    },
    {
        _id: "3",
        name: "Langtang Valley Trek",
        overview: "An intimate trek through lush forests, Tamang heritage, and Himalayan vistas.",
        height: "3,870 m",
        banner: langtangBanner,
        expeditionId: "exp003",
        collections: { slug: "langtang-valley" },
        slug: "langtang-valley",
        maxElevation: "3,870 m"
    },
    {
        _id: "4",
        name: "Manaslu Circuit Trek",
        overview: "Remote trails and dramatic scenery around the eighth highest mountain in the world.",
        height: "5,160 m",
        banner: manasluBanner,
        expeditionId: "exp004",
        collections: { slug: "manaslu-circuit" },
        slug: "manaslu-circuit",
        maxElevation: "5,160 m"
    },
    {
        _id: "5",
        name: "Dhaulagiri Expedition",
        overview: "Challenge yourself with the white mountain, a climb for the bold-hearted.",
        height: "8,167 m",
        banner: dhaulagiriBanner,
        expeditionId: "exp005",
        collections: { slug: "dhaulagiri-expedition" },
        slug: "dhaulagiri-expedition",
        maxElevation: "8,167 m"
    },
    {
        _id: "6",
        name: "Makalu Base Camp",
        overview: "Explore wild beauty and untouched trails beneath the world’s 5th highest peak.",
        height: "4,870 m",
        banner: makaluBanner,
        expeditionId: "exp006",
        collections: { slug: "makalu-base-camp" },
        slug: "makalu-base-camp",
        maxElevation: "4,870 m"
    }
];
