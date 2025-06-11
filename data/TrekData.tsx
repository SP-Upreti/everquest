import AnnapurnaPackage1 from "@/public/TrekkingPackage/AnnapurnaTrek/AnnapurnaPackage1.png";
import AnnapurnaPackage2 from "@/public/TrekkingPackage/AnnapurnaTrek/AnnapurnaPackage2.png";
import AnnapurnaPackage3 from "@/public/TrekkingPackage/AnnapurnaTrek/AnnapurnaPackage3.png";
import AnnapurnaPackage4 from "@/public/TrekkingPackage/AnnapurnaTrek/AnnapurnaPackage4.png";

import EverestPackage1 from "@/public/TrekkingPackage/EverestTrek/EverestPackage1.png";
import EverestPackage2 from "@/public/TrekkingPackage/EverestTrek/EverestPackage2.png";
import EverestPackage3 from "@/public/TrekkingPackage/EverestTrek/EverestPackage3.png";
import EverestPackage4 from "@/public/TrekkingPackage/EverestTrek/EverestPackage4.png";

const TrekData = [
  {
    route: "everest_region",
    heroImg: "",
    intro: `Explore the Everest region through a variety of treks that offer unparalleled views of the world's highest peaks. Trek to Everest Base Camp for a classic journey through Sherpa villages and breathtaking mountain scenery. Alternatively, discover the tranquil turquoise lakes of Gokyo or challenge yourself with the Three Passes Trek, crossing high-altitude mountain passes. For a glimpse of Everest without the full ascent, the Everest View Trek provides stunning vistas. Experience Sherpa culture and hospitality along the way, making each trek in the Everest region a truly unforgettable adventure.`,
    id: 1,
    name: "Everest Region Trekking",
    days: 14,
    distance: "130 km",
    package: [
      {
        packageImg: EverestPackage1,
        packageName: "Everest base camp trek",
        packageDesc: `Located in the eastern reaches of Nepal, the Everest Rolwaling Trek promises an adventure off the beaten path. 
This "wil..
`,
        packageDay: "58 Days",
      },
      {
        packageImg: EverestPackage2,
        packageName: `Everest Three Pass Trek`,
        packageDesc: `Everest Three High Passes Trek is the ultimate trek for thrill-seekers and adventurers in the Everest region.
 In this tr....
`,
        packageDay: "55 Days",
      },
      {
        packageImg: EverestPackage3,
        packageName: `Amadablam Base Camp Trek`,
        packageDesc: `Ama Dablam Base Camp Trekking trail shares the same trail with Everest base camp Trek and Kala Patthar until Pangboche (..`,
        packageDay: "60 Days",
      },
      {
        packageImg: EverestPackage4,
        packageName: `Everest and Gokyo Trek`,
        packageDesc: `The Himalayas of Nepal is without question a magic land of beauty rich in Buddhist culture practiced by probably the har..`,
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "annapurna_region",
    heroImg: "",
    intro: `Discover the diverse landscapes and rich cultural tapestry of the Annapurna region through a variety of trekking experiences. Trek to Annapurna Base Camp for a journey through lush forests, charming Gurung villages, and up-close views of towering peaks like Machapuchare and Annapurna South. The Annapurna Circuit offers a longer, adventurous route encircling the Annapurna massif, crossing high mountain passes and diverse terrain. For a shorter trek with panoramic mountain views, the Poon Hill trek is perfect, blending easy trails with spectacular sunrise vistas over the Annapurna range. Each trek in the Annapurna region promises breathtaking scenery, cultural encounters, and a memorable Himalayan adventure.`,
    id: 2,
    name: "Annapurna Region Trekking",
    days: 21,
    distance: "230 km",
    package: [
      {
        packageImg: AnnapurnaPackage1,
        packageName: `Annapurna Base Camp (ABC) Trek`,
        packageDesc: `Embark on the Annapurna Base Camp (ABC) Trek, a spellbinding adventure through Nepal's Himalayas. This trek unfolds a dr..`,
        packageDay: "34 Days",
      },
      {
        packageImg: AnnapurnaPackage2,
        packageName: `Ghorepani Poon Hill Trek`,
        packageDesc: `Embark on the captivating Ghorepani Poon Hill Trek, an unforgettable journey through the heart of Nepal's Annapurna region...`,
        packageDay: "55 Days",
      },
      {
        packageImg: AnnapurnaPackage3,
        packageName: `Jomsom Muktinath Trek
`,
        packageDesc: `The best time for the Jomsom Muktinath trekking is the Spring season and the Autumn season. Starting from the months of ..
`,
        packageDay: "35 Days",
      },
      {
        packageImg: AnnapurnaPackage4,
        packageName: `Mardi Himal Trek`,
        packageDesc: `The trailhead of the trekking is similar to lots of Annapurna region trekking in Nepal. The usual first famous destinati..`,
        packageDay: "35 Days",
      },
    ],
  },
];

export default TrekData;
