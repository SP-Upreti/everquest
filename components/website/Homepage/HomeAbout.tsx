import PackageCard from "@/components/Card";
import { PinContainer } from "@/components/ui/3d-pin";
import { useExpedition } from "@/context/Expeditions";
import Slider from "./trekking-slider";
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "./trekking-slider";
import { ParallaxText } from "@/components/ParallexText";


export const SLIDES = [
  {
    "img": "/slides/img1.avif",
    "value": "310",
    "unit": "U/L",
    "title": "Creatine Kinase",
    "short": "CK",
    "description": "Tracks how well your body is recovering from exercise, injury, or underlying inflammation.",
    "image": "/images/creatine-kinase.jpg"
  },
  {
    "img": "/slides/img2.avif",
    "value": "6.2",
    "unit": "%",
    "title": "Omega-3 Index",
    "short": "EPA+DHA",
    "description": "Linked to brain health, mental wellbeing, and heart or hormone imbalances.",
    "image": "/images/omega-3.jpg"
  },
  {
    "img": "/slides/img2.avif",
    "value": "948",
    "unit": "μmol/L",
    "title": "Glutathione",
    "short": "GSH",
    "description": "Your body’s main antioxidant, protecting cells from damage and helping your liver clear out toxins.",
    "image": "/images/glutathione.jpg"
  },
  {
    "img": "/slides/img3.avif",
    "value": "4.5",
    "unit": "mg/dL",
    "title": "Vitamin D",
    "short": "25(OH)D",
    "description": "Supports bone health and immune function, commonly low in indoor lifestyles.",
    "image": "/images/vitamin-d.jpg"
  },
  {
    "img": "/slides/img4.avif",
    "value": "125",
    "unit": "mg/dL",
    "title": "Blood Glucose",
    "short": "BG",
    "description": "Measures blood sugar levels — important for energy and diabetes monitoring.",
    "image": "/images/blood-glucose.jpg"
  },
  {
    "img": "/slides/img5.avif",
    "value": "14.2",
    "unit": "g/dL",
    "title": "Hemoglobin",
    "short": "Hb",
    "description": "Carries oxygen in your blood — vital for stamina, energy, and organ function.",
    "image": "/images/hemoglobin.jpg"
  },
  {
    "img": "/slides/img6.avif",
    "value": "70",
    "unit": "bpm",
    "title": "Heart Rate",
    "short": "HR",
    "description": "Measures the number of heartbeats per minute, a key cardiovascular indicator.",
    "image": "/images/heart-rate.jpg"
  },
  {
    "img": "/slides/img7.avif",
    "value": "95",
    "unit": "%",
    "title": "Oxygen Saturation",
    "short": "SpO2",
    "description": "Represents the percentage of oxygen in your blood, essential for cellular health.",
    "image": "/images/oxygen-saturation.jpg"
  },
  {
    "img": "/slides/img3.avif",
    "value": "18.5",
    "unit": "kg/m²",
    "title": "Body Mass Index",
    "short": "BMI",
    "description": "Ratio of weight to height — helps categorize underweight, normal, or overweight.",
    "image": "/images/bmi.jpg"
  },
  {
    "img": "/slides/img5.avif",
    "value": "120",
    "unit": "mmHg",
    "title": "Blood Pressure",
    "short": "BP",
    "description": "Vital sign measuring the force of blood against artery walls — key for heart health.",
    "image": "/images/blood-pressure.jpg"
  }
]

const Mountaineering = [
  {
    "id": 1,
    "title": "Mount Everest",
    "location": "Solukhumbu, Nepal",
    "altitude": 8848,
    "image": "/mountains/everest.jpg",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quas."
  },
  {
    "id": 2,
    "title": "Mt. Annapurna I",
    "location": "Kaski, Nepal",
    "altitude": 8091,
    "image": "/mountains/annapurna.jpg",
    "description": "One of the most beautiful peaks, known for its trekking circuit."
  },
  {
    "id": 3,
    "title": "Mt. Kanchenjunga",
    "location": "Taplejung, Nepal",
    "altitude": 8586,
    "image": "/mountains/kanchanjunga.jpg",
    "description": "Third highest mountain in the world, located in eastern Nepal."
  },
  {
    "id": 4,
    "title": "Mt.  Makalu",
    "location": "Sankhuwasabha, Nepal",
    "altitude": 8485,
    "image": "/mountains/annapurna.jpg",
    "description": "A pyramid-shaped mountain, 5th highest in the world."
  },
  {
    "id": 5,
    "title": "Mt. Dhaulagiri",
    "location": "Myagdi, Nepal",
    "altitude": 8167,
    "image": "/mountains/kanchanjunga.jpg",
    "description": "Massive mountain with a dramatic drop to the Kali Gandaki valley."
  },
  {
    "id": 6,
    "title": "Mt. Manaslu",
    "location": "Gorkha, Nepal",
    "altitude": 8163,
    "image": "/mountains/everest.jpg",
    "description": "Known as the Mountain of the Spirit, 8th highest peak."
  },
  {
    "id": 7,
    "title": "Mt. Lhotse",
    "location": "Solukhumbu, Nepal",
    "altitude": 8516,
    "image": "/mountains/kanchanjunga.jpg",
    "description": "Right next to Everest, the fourth highest mountain on Earth."
  }
]



export default function AboutHome({ }: any) {
  const { expeditions } = useExpedition();

  // Filter bestsellers and separate by collection type
  const bestSellers = expeditions.filter((item: any) => item.isBestseller);

  const mountaineeringExpeditions = bestSellers
    .filter((item: any) => item.collections?.slug === "mountaineering")
    .slice(0, 4);

  const trekkingExpeditions = bestSellers
    .filter((item: any) => item.collections?.slug === "trekking")
    .slice(0, 4);

  const OPTIONS: EmblaOptionsType = { loop: true }


  return (
    <div className="w-full  pb-[4rem] relative px-16  py-24 ">
      <div className="flex flex-col gap-10 ">

        <div className="md:my-10 my-2 flex flex-col gap-16 ">
          {/* Mountaineering Section */}
          <div className="flex flex-col gap-16">
            <h3 className="text-3xl md:text-4xl space-y-3 lg:text-5xl xl:text-6xl font-bold  text-[#DFB6FF]">
              <ParallaxText text="Unforgettable Mountaineering" triggerOnce={false} />
              <ParallaxText text="--and Trekking Adventures " triggerOnce={false} />
              <ParallaxText text="in Nepal's Himalayas" triggerOnce={false} />
            </h3>
            <EmblaCarousel slides={Mountaineering} />
          </div>

          {/* Trekking Section */}
          <div className="flex flex-col gap-16">
            <h3 className="text-3xl md:text-4xl space-y-3 lg:text-5xl xl:text-6xl font-bold  text-[#DFB6FF]">
              <ParallaxText text="Incredible Trekking Journeys " triggerOnce={false} />
              <ParallaxText text="Through Nepal’s Scenic Trails " triggerOnce={false} />
            </h3>
            <EmblaCarousel slides={Mountaineering} />
          </div>
        </div>
      </div>
    </div >
  );
}
