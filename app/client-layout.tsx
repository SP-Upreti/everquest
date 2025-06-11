"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { CollectionProvider } from "@/context/Collections";
import { ActivitiesProvider } from "@/context/Activities";
import { TrainingProvider } from "@/context/Training";
import { ExpeditionProvider } from "@/context/Expeditions";
import { BlogProvider } from "@/context/Blog";
import { usePathname } from "next/navigation";
import Preloader from "./preloader/Preloader";
import HomeMain from "@/components/website/Homepage/HomeMain";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const currentRoute = usePathname();

  // Memoize the preloader state to prevent unnecessary re-renders
  const showPreloader = currentRoute === "/" && isPreloaderVisible;

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Animation frame for smooth scrolling
    let animationFrameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    // Handle preloader for homepage
    if (currentRoute === "/") {
      const hasSeenPreloader = sessionStorage.getItem("preloaderShown");
      if (!hasSeenPreloader) {
        setIsPreloaderVisible(true);
        const timer = setTimeout(() => {
          sessionStorage.setItem("preloaderShown", "true");
          setIsPreloaderVisible(false);
        }, 1000); // 1s preloader duration

        return () => clearTimeout(timer);
      }
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [currentRoute]);

  return (
    <>
      <Toaster />
      {showPreloader ? (
        <Preloader />
      ) : (
        <CollectionProvider>
          <ActivitiesProvider>
            <TrainingProvider>
              <ExpeditionProvider>
                <BlogProvider>
                  <Navbar />
                  <div className="w-full h-full ">
                    {currentRoute === "/" ? (
                      <HomeMain />
                    ) : (
                      children
                    )}
                  </div>
                  <Footer />
                </BlogProvider>
              </ExpeditionProvider>
            </TrainingProvider>
          </ActivitiesProvider>
        </CollectionProvider>
      )}
    </>
  );
}