'use client'
import styles from './styles.module.css'
import Picture5 from '../../../public/images/sea1.jpg'
import Picture2 from '../../../public/images/sea2.webp'
import Picture3 from '../../../public/images/sea3.jpg'
import Picture4 from '../../../public/images/sea4.webp'
import Picture1 from '../../../public/images/sea5.jpg'
import Picture6 from '../../../public/images/sea6.jpeg'
import Picture7 from '../../../public/images/sea7.jpg'
import Image from 'next/image'
import {useScroll, useTransform,motion} from "framer-motion";
import {useRef} from "react";


export default function Zoom() {
    const container =useRef(null);

    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start start','end end']
    })
    const scale4 = useTransform(scrollYProgress, [0,1], [1,4]);
    const scale5 = useTransform(scrollYProgress, [0,1], [1,5]);
    const scale6 = useTransform(scrollYProgress, [0,1], [1,6]);
    const scale8 = useTransform(scrollYProgress, [0,1], [1,8]);
    const scale9 = useTransform(scrollYProgress, [0,1], [1,9]);

    const pictures = [
        {
            src:Picture1,
            scale:scale4
        },
        {
            src:Picture2,
            scale:scale8,
        },
        {
            src:Picture3,
            scale:scale9
        },
        {
            src:Picture4,
            scale:scale5
        },
        {
            src:Picture5,
            scale:scale6
        },
        {
            src:Picture6,
            scale:scale4
        },
        {
            src:Picture7,
            scale:scale9
        }
    ]

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {
                    pictures.map(({src,scale},index) => {
                        return (
                            <motion.div style={{scale}} key={index} className={styles.el}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={src}
                                        fill={true}
                                        alt="image"
                                        placeholder='blur'
                                    />
                                </div>
                            </motion.div>
                        )
                    })
                }

            </div>
        </div>
    );
};

