import EverestTrek1 from "@/public/TrekkingPackage/EverestTrek/EverestPackage1.png";
import Paragliding1 from "@/public/OtherActivities/Paragliding/paragliding1.avif";
import Paragliding2 from "@/public/OtherActivities/Paragliding/paragliding2.avif";
import Paragliding3 from "@/public/OtherActivities/Paragliding/paragliding3.avif";
import Paragliding4 from "@/public/OtherActivities/Paragliding/paragliding4.avif";
import Paragliding5 from "@/public/OtherActivities/Paragliding/paragliding5.avif";

import RockClimbing1 from "@/public/OtherActivities/RockClimbing/rock-climbing1.avif";
import RockClimbing2 from "@/public/OtherActivities/RockClimbing/rock-climbing2.avif";
import RockClimbing3 from "@/public/OtherActivities/RockClimbing/rock-climbing3.avif";
import RockClimbing4 from "@/public/OtherActivities/RockClimbing/rock-climbing4.avif";
import RockClimbing5 from "@/public/OtherActivities/RockClimbing/rock-climbing5.avif";

import MountainBiking1 from "@/public/OtherActivities/MountainBiking/mountain-biking1.avif";
import MountainBiking2 from "@/public/OtherActivities/MountainBiking/mountain-biking2.avif";
import MountainBiking3 from "@/public/OtherActivities/MountainBiking/mountain-biking3.avif";
import MountainBiking4 from "@/public/OtherActivities/MountainBiking/mountain-biking4.avif";
import MountainBiking5 from "@/public/OtherActivities/MountainBiking/mountain-biking5.avif";

import HeliTour1 from "@/public/OtherActivities/HeliTour/heli-tour1.webp";
import HeliTour2 from "@/public/OtherActivities/HeliTour/heli-tour2.webp";
import HeliTour3 from "@/public/OtherActivities/HeliTour/heli-tour3.avif";
import HeliTour4 from "@/public/OtherActivities/HeliTour/heli-tour4.webp";
import HeliTour5 from "@/public/OtherActivities/HeliTour/heli-tour5.webp";

import Rafting1 from "@/public/OtherActivities/Rafting/rafting1.avif";
import Rafting2 from "@/public/OtherActivities/Rafting/rafting2.avif";
import Rafting3 from "@/public/OtherActivities/Rafting/rafting3.avif";
import Rafting4 from "@/public/OtherActivities/Rafting/rafting4.avif";
import Rafting5 from "@/public/OtherActivities/Rafting/rafting5.avif";

import tour0 from "@/public/tour/nepal.webp";
import tour1 from "@/public/tour/bhutan1.jpg";
import tour2 from "@/public/tour/bhutan2.jpg";
import tour3 from "@/public/tour/bhutan3.jpg";

import ice1 from "@/public/OtherActivities/iceclimbing/ice2.webp";
import ice2 from "@/public/OtherActivities/iceclimbing/ice2.webp";
import ice3 from "@/public/OtherActivities/iceclimbing/ice3.jpg";

import heritage1 from "@/public/OtherActivities/heritage/heritage1.jpg";
import heritage2 from "@/public/OtherActivities/heritage/heritage2.jpg";
import heritage3 from "@/public/OtherActivities/heritage/heritage3.jpg";

import pilgrims1 from "@/public/OtherActivities/pilgrims/pilgrims.png";
import pilgrims2 from "@/public/OtherActivities/pilgrims/pilgrims2.webp";
import pilgrims3 from "@/public/OtherActivities/pilgrims/pilgrims3.jpg";

import safari1 from "@/public/OtherActivities/safari/safari1.jpg";
import safari2 from "@/public/OtherActivities/safari/safari2.jpg";
import safari3 from "@/public/OtherActivities/safari/safari3.jpg";

import school1 from "@/public/OtherActivities/school/school1.jpg";
import school2 from "@/public/OtherActivities/school/school2.webp";
import school3 from "@/public/OtherActivities/school/school3.jpg";

const OtherActivitiesData = [
  {
    route: "rafting",
    id: 1,
    name: "Rafting",
    desc: "Dive into an exhilarating rafting adventure on Nepal's roaring rivers. Navigate through thrilling rapids and tranquil stretches, surrounded by stunning landscapes and lush greenery. This 14-day journey offers a perfect blend of adrenaline-pumping action and serene natural beauty, ideal for both seasoned rafters and beginners. Experience the excitement of white-water rafting, camp under the stars, and immerse yourself in the vibrant culture and breathtaking scenery of Nepal.As you paddle through the heart of the Himalayas, witness dramatic gorges, cascading waterfalls, and rugged cliffs that form a backdrop of pure natural grandeur. Along the way, visit remote villages, where you can interact with the warm, hospitable locals and get a taste of Nepal's rich traditions and heritage. Each day on the river brings new challenges and unforgettable moments, whether it’s conquering powerful rapids or drifting peacefully along calm waters.",
    days: 14,
    HeroImg: Rafting3,
    gallery: [Rafting1, Rafting2, Rafting4],
    day: [
      {
        desc: "Arrival at Sukute",
      },
      {
        desc: "Welcome drinks",
      },
      {
        desc: "lunch",
      },
      {
        desc: "Indoor Activities",
      },
      {
        desc: "Rafting",
      },
      {
        desc: "Snacks",
      },
      {
        desc: "Departure",
      },
    ],
    daytwo: [
      {
        desc: "Breskfast",
      },
      {
        desc: "Lunch",
      },
      {
        desc: "Sightseeing",
      },
      {
        desc: "Indoor Activities",
      },
      {
        desc: "Snacks",
      },
      {
        desc: "Dinner",
      },
      {
        desc: "Departure",
      },
    ],
    daythree: [
      {
        desc: "Breskfast",
      },
      {
        desc: "Lunch",
      },
      {
        desc: "Sightseeing",
      },
      {
        desc: "Indoor Activities",
      },
      {
        desc: "Snacks",
      },
      {
        desc: "Dinner",
      },
      {
        desc: "Departure",
      },
    ],

    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "heli_tour",
    id: 1,
    name: "Heli Tour",
    desc: "Embark on an unforgettable helicopter adventure across Nepal's stunning landscapes. Soar high above the clouds for a bird's-eye view of the Himalayas, including the iconic Mount Everest. Our helicopter tours provide a luxurious and effortless way to explore remote regions, sacred sites, and picturesque valleys in just a few hours. Perfect for those who want to experience mountain beauty without the physical challenges of trekking.From the moment you take off, you'll be mesmerized by panoramic views of snow-capped peaks, hidden glacial lakes, and dramatic ridgelines. Fly over ancient monasteries perched on cliffs, serene alpine villages, and lush valleys that remain inaccessible by traditional means. The journey offers an unparalleled perspective of Nepal’s natural wonders, blending adventure with comfort.Touch down in some of the most pristine and sacred spots, where you’ll have the rare opportunity to experience Nepal’s spiritual side. ",
    days: 14,
    HeroImg: HeliTour3,
    gallery: [HeliTour1, HeliTour2, HeliTour3],
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "paragliding",
    id: 2,
    name: "Paragliding",
    desc: "Experience the thrill of paragliding over Nepal's breathtaking landscapes. Glide through the air and enjoy panoramic views of the Himalayas, lush valleys, and serene lakes. This adventure is perfect for adrenaline seekers and offers a unique perspective of Nepal's natural beauty. As you take flight, feel the rush of excitement while soaring like a bird, suspended high above picturesque terrains. From the snow-capped peaks of the Annapurna range to the shimmering waters of Phewa Lake, every moment offers a new, awe-inspiring vista. Whether you're a seasoned paraglider or a first-time flyer, this adventure provides an exhilarating way to witness Nepal’s diverse landscapes from the sky.Marvel at the harmony of nature below as you drift through warm thermals, catching glimpses of terraced fields, tranquil villages, and verdant forests.The experience combines the adrenaline of flight with the serenity of floating peacefully through the clouds, making it both a thrilling and tranquil escape",
    days: 1,
    HeroImg: Paragliding2,
    gallery: [Paragliding1, Paragliding2, Paragliding3],
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "mountain_biking",
    id: 4,
    name: "Mountain Biking",
    desc: "Explore Nepal's rugged terrain and picturesque landscapes on a mountain biking adventure like no other. Ride through challenging trails that take you deep into the heart of Nepal’s stunning natural beauty, passing through ancient villages, terraced fields, and lush forests. Whether you're pedaling along steep mountain paths or coasting through serene valleys, each turn offers breathtaking views and an immersive experience of the region's rich culture.Perfect for both seasoned bikers and adventure enthusiasts, this journey combines the thrill of off-road biking with the opportunity to connect with Nepal's traditional communities and untouched wilderness. Feel the adrenaline as you conquer steep climbs, rocky descents, and winding single tracks, all while surrounded by the towering Himalayas and vibrant landscapes.Along the way, enjoy moments of serenity as you pause to soak in panoramic views, visit local villages, and witness daily life in remote areas that few travelers get to see.",
    days: 3,
    HeroImg: MountainBiking4,
    gallery: [MountainBiking3, MountainBiking4, MountainBiking5],
    package: [],
  },
  {
    route: "rock_climbing",
    id: 5,
    name: "Rock Climbing",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.Scale rugged cliffs and vertical rock faces set against the backdrop of towering Himalayan peaks and lush, green landscapes. Whether you're tackling steep crags in the Kathmandu Valley or venturing to remote climbing spots in the Annapurna or Langtang regions, each climb provides a unique and exhilarating challenge. Nepal’s climbing routes cater to all skill levels, from gentle slopes perfect for beginners to more technical, demanding routes for seasoned climbers seeking the ultimate test.Along the way, you'll be rewarded with breathtaking views of pristine nature, tranquil rivers, and vast mountain vistas.Engage with local climbing communities and gain insight into Nepal's rich culture while sharpening your climbing techniques. ",
    days: 2,
    HeroImg: RockClimbing5,
    gallery: [RockClimbing1, RockClimbing2, RockClimbing3],
    package: [],
  },
  {
    route: "tour",
    id: 4,
    name: "Bhutan Tour",
    desc: "Embark on an extraordinary journey through Nepal, where every moment is filled with adventure and discovery. Our tour group packages are perfect for travelers looking to experience the best of Nepal, from its ancient temples and bustling cities to the serene beauty of the Himalayas.Whether you're trekking through the lush forests of Annapurna, visiting the sacred temples of Kathmandu, or enjoying a thrilling safari in Chitwan National Park, our tours offer something for everyone. Our experienced guides ensure that you not only witness the beauty of Nepal but also immerse yourself in its vibrant culture, rich history, and diverse landscapes.Ideal for groups of friends, families, or clubs, these tours are designed to provide a mix of adventure, relaxation, and cultural exploration. Enjoy the comforts of group travel while exploring the hidden gems and well-known landmarks of Nepal",
    days: 3,
    HeroImg: tour1,
    gallery: [tour1, tour2, tour3],
    package: [],
  },
  {
    route: "nepaltour",
    id: 4,
    name: "Nepal Tour",
    desc: "Embark on an extraordinary journey through Nepal, where every moment is filled with adventure and discovery. Our tour group packages are perfect for travelers looking to experience the best of Nepal, from its ancient temples and bustling cities to the serene beauty of the Himalayas.Whether you're trekking through the lush forests of Annapurna, visiting the sacred temples of Kathmandu, or enjoying a thrilling safari in Chitwan National Park, our tours offer something for everyone. Our experienced guides ensure that you not only witness the beauty of Nepal but also immerse yourself in its vibrant culture, rich history, and diverse landscapes.Ideal for groups of friends, families, or clubs, these tours are designed to provide a mix of adventure, relaxation, and cultural exploration. Enjoy the comforts of group travel while exploring the hidden gems and well-known landmarks of Nepal",
    days: 3,
    HeroImg: tour1,
    gallery: [tour1, tour2, tour3],
    package: [],
  },
  {
    route: "safari",
    id: 4,
    name: "Jungle Safari",
    desc: "Step into the heart of the wild with our immersive jungle safari experience. Navigate through vast stretches of untamed wilderness, where every corner reveals the mysteries of nature. Encounter an astonishing variety of wildlife, from playful monkeys swinging through the trees to stealthy tigers stalking through the underbrush. Feel the thrill as you spot rare species like the Bengal tiger, sloth bear, or gharial crocodile, all while surrounded by the captivating sights and sounds of the jungle.Our safaris cater to both the adventurous spirit and those seeking tranquility. Cruise along serene rivers on a boat safari or venture deep into the jungle on a 4x4 for an up-close experience of nature’s wonders. As the sun sets, listen to the distant call of wildlife echoing through the night, offering a surreal glimpse into life in the wilderness. Accompanied by seasoned guides, you’ll not only witness breathtaking wildlife but also gain insight into conservation efforts and the delicate balance of these ecosystems.Whether it’s for photographers, wildlife lovers, or anyone in search of a magical escape, our jungle safaris promise an unforgettable journey into the raw and magnificent beauty of nature’s most vibrant landscapes. Come, explore the wild like never before",
    days: 3,
    HeroImg: safari1,
    gallery: [safari1, safari2, safari3],
    package: [],
  },
  {
    route: "heritagetour",
    id: 4,
    name: "Heritage Tour",
    desc: "Step into the rich tapestry of history with our immersive heritage tour experience. Traverse through ancient cities, historic landmarks, and cultural treasures, where every step unveils stories of the past. Discover an astonishing variety of architectural marvels, from majestic palaces that once housed royalty to intricately carved temples standing the test of time. Feel the awe as you explore heritage sites like grand forts, centuries-old monuments, or sacred shrines, all while surrounded by the echoes of a bygone era.Our heritage tours cater to both the curious traveler and history enthusiast. Stroll through bustling markets filled with traditional crafts, or wander through serene courtyards where time seems to stand still. As the sun sets behind ancient walls, listen to the timeless tales passed down through generations, offering a glimpse into the culture, traditions, and legacies of those who came before. Accompanied by knowledgeable guides, you’ll not only witness stunning historical sites but also gain a deep understanding of the cultural significance and preservation efforts behind them.Whether it’s for photographers, history lovers, or anyone seeking to reconnect with the past, our heritage tours promise an unforgettable journey into the fascinating stories of human civilization. Come, explore the wonders of history like never before.",
    days: 3,
    HeroImg: heritage1,
    gallery: [heritage1, heritage2, heritage3],
    package: [],
  },
  {
    route: "pilgrims",
    id: 4,
    name: "Pilgrims Tour",
    desc: "Embark on a spiritual journey like no other with our immersive pilgrims tour experience. Traverse through sacred lands and ancient temples, where every step brings you closer to the divine. Encounter an astonishing variety of holy sites, from peaceful monasteries perched on hilltops to grand temples resonating with centuries of devotion. Feel the serenity as you visit revered destinations such as holy rivers, sacred shrines, or age-old pilgrimage routes, all while being surrounded by the profound energy of spirituality and faith.Our pilgrim tours cater to both the devout and those seeking inner peace. Walk in the footsteps of saints and sages, or simply take a moment for quiet reflection in tranquil settings that inspire contemplation. As the sun sets behind sacred spires, listen to the chants and prayers echoing through the evening air, offering a profound connection to traditions that span millennia. Accompanied by knowledgeable guides, you’ll not only visit important religious sites but also gain deeper insight into the rituals, beliefs, and history that define these spiritual paths.Whether you are a seeker of spiritual growth, a photographer capturing sacred moments, or simply looking for a journey of peace and reflection, our pilgrims tours promise an unforgettable exploration of faith, devotion, and the enduring beauty of the human spirit. Come, explore the sacred like never before.",
    days: 3,
    HeroImg: pilgrims1,
    gallery: [pilgrims2, pilgrims1, pilgrims2],
    package: [],
  },
  {
    route: "iceclimbing",
    id: 4,
    name: "Ice Climbing",
    desc: "Experience the thrill of ice climbing, a heart-pounding adventure that takes you to the majestic frozen landscapes of towering glaciers and icy waterfalls. Whether you’re a seasoned climber or a beginner eager to try something new, ice climbing offers a unique challenge as you ascend vertical walls of ice, using specialized equipment to navigate the frozen terrain. Every swing of the ice axe and every step with your crampons brings you closer to the summit, where stunning panoramic views of snow-covered mountains await.Guided by expert instructors, you’ll learn essential techniques and safety skills to conquer the ice, all while soaking in the awe-inspiring beauty of the winter wilderness. Feel the adrenaline rush as you tackle frozen waterfalls or glacial formations, with the crisp mountain air and the sound of ice crunching beneath your gear enhancing the adventure.For thrill-seekers and nature lovers alike, ice climbing is more than just a sport—it's a journey into some of the planet's most breathtaking and pristine environments.",
    days: 3,
    HeroImg: ice3,
    gallery: [ice3, ice2, ice1],
    package: [],
  },
  {
    route: "schooling_group",
    id: 5,
    name: "Schooling Group",
    desc: "Designed for students and educational institutions, our schooling group programs provide an enriching blend of education, adventure, and cultural exchange in the heart of Nepal. Tailored to meet the learning goals of your group, these programs combine hands-on experiences with guided exploration of Nepal's natural and cultural wonders.Students will explore key sites, such as the ancient Durbar Squares, UNESCO World Heritage Sites, and the breathtaking landscapes of the Himalayas, all while engaging in interactive learning. Activities include eco-treks to learn about Himalayan ecology, cultural workshops with local artisans, and exchanges with Nepali schools to foster global understanding.Led by experienced educators and local guides, our schooling tours offer a well-rounded experience, encouraging curiosity, critical thinking, and a deeper appreciation of Nepal’s unique heritage. ",
    days: 2,
    HeroImg: school1,
    gallery: [school1, school2, school3],
    package: [],
  },
];

export default OtherActivitiesData;
