"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import Intro from "@/components/Intro/Intro";
import Description from "@/components/Description/Desctiption";
import Projects from "@/components/Projects/Projects";
import Gallery from "@/components/Gallery/Gallery";
import Zoom from "@/components/Zoom/Zoom";
import FinalSection from "@/components/FinalSection/FinalSection";
import Footer from "@/components/Footer/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        let locomotiveScroll;

        const init = async () => {
            gsap.registerPlugin(ScrollTrigger);

            const LocomotiveScroll = (await import("locomotive-scroll")).default;

            locomotiveScroll = new LocomotiveScroll({
                el: containerRef.current,
                smooth: true,
                multiplier: 1.5,
                smartphone: {
                    smooth: true,
                },
                tablet: {
                    smooth: true,
                },
                // For v5+
                scroll: (instance) => {
                    ScrollTrigger.update();
                },
            });

            ScrollTrigger.scrollerProxy(containerRef.current, {
                scrollTop(value) {
                    return arguments.length
                        ? locomotiveScroll.scrollTo(value, 0, 0)
                        : locomotiveScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: containerRef.current.style.transform ? "transform" : "fixed",
            });

            const lsUpdate = () => {
                if (locomotiveScroll) {
                    locomotiveScroll.update();
                }
            };

            ScrollTrigger.addEventListener("refresh", lsUpdate);
            ScrollTrigger.refresh();

            // New useEffect to handle updates
            const timeout = setTimeout(() => {
                lsUpdate();
            }, 500);

            return () => {
                clearTimeout(timeout);
                if (locomotiveScroll) {
                    ScrollTrigger.removeEventListener("refresh", lsUpdate);
                    locomotiveScroll.destroy();
                }
            };
        };

        init();
    }, []);

    return (
        <main
            ref={containerRef}
            className={styles.main}
        >
            <Intro />
            <Description />
            <Projects />
            <Gallery />
            <Zoom />
            <FinalSection />
            <Footer />
        </main>
    );
}
