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
        banner: "https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg",
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
        banner: "https://cdn.pixabay.com/photo/2017/10/21/16/18/cholatse-2875106_1280.jpg",
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
        banner: "https://cdn.pixabay.com/photo/2023/01/31/08/53/mountain-7757483_1280.jpg",
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
        banner: "https://cdn.pixabay.com/photo/2022/07/24/14/57/machhapuchhare-7341816_1280.jpg",
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
        banner: "https://cdn.pixabay.com/photo/2019/11/21/12/38/annapurna-4642491_1280.jpg",
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
        banner: "https://cdn.pixabay.com/photo/2020/09/10/01/41/mountain-5559008_1280.jpg",
        expeditionId: "exp006",
        collections: { slug: "makalu-base-camp" },
        slug: "makalu-base-camp",
        maxElevation: "4,870 m"
    }
];
