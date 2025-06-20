"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

const FinalSection = () => {

    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const scrollTriggerSettings = {
            trigger: mainRef.current,
            start: "top 25%",
            toggleActions: "play reverse play reverse",
        }
        const leftXValues = [-800,-900,-400]
        const rightXValues = [800,900,400]
        const leftRotationValues = [-30,-20,-35]
        const rightRotationValues = [30,20,35]
        const yValues =[100,-150,-400];


        gsap.utils.toArray(`.${styles.row}`).forEach((row,index) => {
            const cardLeft = row.querySelector(`.${styles.cardLeft}`);
            const cardRight = row.querySelector(`.${styles.cardRight}`);
            gsap.to([cardLeft, cardRight], {
                x: index => index === 0 ? leftXValues[index] : rightXValues[index], // 0 is left, 1 is right
                y: yValues[index],
                rotation: index => index === 0 ? leftRotationValues[index] : rightRotationValues[index],
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top center",
                    end: "150% bottom",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px translateY${progress * yValues[index]}px rotate(${progress * leftRotationValues[index]}deg)`
                        cardRight.style.transform = `translateX(${progress * rightXValues[index]}px translateY${progress * yValues[index]}px rotate(${progress * rightRotationValues[index]}deg)`

                    }
                }
            })
        })

        gsap.to(logoRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        })

        gsap.to(`.${styles.lineText}`, {
            y: 0,
            stagger:0.1,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        })

        gsap.to(buttonRef.current, {
            y:0,
            opacity: 1,
            delay: 0.25,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: scrollTriggerSettings,
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    },[])

    const generateRows = () => {
        const rows = [];
        for (let i = 1; i <= 3; i++) {
            rows.push(
                <div className={styles.row} key={i}>
                    <div className={`${styles.card} ${styles.cardLeft}`}>
                        <img src={`/images/img-${2 * i - 1}.jpg`} alt=""/>
                    </div>
                    <div className={`${styles.card} ${styles.cardRight}`}>
                        <img src={`/images/img-${2 * i}.jpg`} alt=""/>
                    </div>
                </div>
            );
        }
        return rows
    }

    return (
        <div className={styles.finalSection}>
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.img}>
                    <img className={styles.logoImage} src="/images/artistic.jpg" alt=""/>
                </div>
            </section>
            <section ref={mainRef} className={`${styles.section} ${styles.main}`}>
                <div className={styles.mainContent}>
                    <div ref={logoRef} className={styles.logo}>
                        <img src="/images/gall.png" alt=""/>
                    </div>
                    <div className={styles.copy}>
                        <div className={styles.line}>
                            <p className={styles.lineText}>
                                Dive into animated design

                            </p>
                        </div>
                        <div className={styles.line}>
                            <p className={styles.lineText}>
                                Take the fast lane to mastery.
                            </p>
                        </div>
                        <div className={styles.line}>
                            <p className={styles.lineText}>
                                Enjoy the atmosphere
                            </p>
                        </div>
                    </div>
                    <div ref={buttonRef} className={styles.btnContainer}>
                        <button className={styles.btn}  >Connect</button>
                    </div>
                </div>
                {generateRows()}

            </section>
        </div>
    );
};

export default FinalSection;