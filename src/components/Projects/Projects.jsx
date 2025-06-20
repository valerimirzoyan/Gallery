import styles from "./styles.module.css";
import { useEffect } from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Mona Lisa",
            src: "Mona_Lisa.jpg",
            artist: "Leonardo da Vinci",
            description: "The Mona Lisa is a half-length portrait painting by the Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as (the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world.) The painting's novel qualities include the subject's enigmatic expression, monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism."
        },
        {
            title: "The Starry Night",
            src: "Starry_Night.jpg",
            artist: "Vincent van Gogh",
            description: "The Starry Night, often called simply Starry Night, is an oil-on-canvas painting by the Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village. It has been in the permanent collection of the Museum of Modern Art in New York City since 1941, acquired through the Lillie P."
        },
        {
            title: "The Persistence of Memory",
            src: "7.jpg",
            artist: "Salvador Dalí",
            description: "The Persistence of Memory is a 1931 painting by artist Salvador Dalí and one of the most recognizable works of Surrealism. First shown at the Julien Levy Gallery in 1932, since 1934 the painting has been in the collection of the Museum of Modern Art in New York City, which received it from an anonymous donor. It is widely recognized and frequently referred to in popular culture, and sometimes referred to by more descriptive titles, such as (The Melting Clocks), (The Soft Watches) or (The Melting Watches). "
        },
        {
            title: "The Birth of Venus",
            src: "The_Birth_Of_Venus.jpg",
            artist: "Sandro Botticelli",
            description: "TThe Birth of Venus is a painting by the Italian artist Sandro Botticelli, probably executed in the mid-1480s. It depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown. The painting is in the Uffizi Gallery in Florence, Italy. Although the two are not a pair, the painting is inevitably discussed with Botticelli's other very large mythological painting, the Primavera, also in the Uffizi."
        }
    ];

    useEffect(() => {
        function inView(opt) {
            if (opt.selector === undefined) {
                console.log('Valid selector required for inView');
                return false;
            }
            var elems = [].slice.call(document.querySelectorAll(opt.selector)),
                once = opt.once === undefined ? true : opt.once,
                offsetTop = opt.offsetTop === undefined ? 0 : opt.offsetTop,
                offsetBot = opt.offsetBot === undefined ? 0 : opt.offsetBot,
                count = elems.length,
                winHeight = 0,
                ticking = false;

            function update() {
                var i = count;
                while (i--) {
                    var elem = elems[i],
                        rect = elem.getBoundingClientRect();
                    if (rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot) {
                        elem.classList.add(styles.inView);
                        if (once) {
                            count--;
                            elems.splice(i, 1);
                        }
                    } else {
                        elem.classList.remove(styles.inView);
                    }
                }
                ticking = false;
            }

            function onResize() {
                winHeight = window.innerHeight;
                requestTick();
            }

            function onScroll() {
                requestTick();
            }

            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(update);
                    ticking = true;
                }
            }

            window.addEventListener('resize', onResize, false);
            document.addEventListener('scroll', onScroll, false);
            document.addEventListener('touchmove', onScroll, false);

            onResize();
        }

        inView({
            selector: `.${styles.viewPoll}`,
            once: false,
            offsetTop: 0,
            offsetBot: 50
        });
    }, []);

    return (
        <div className={styles.projects}>
            <div className={styles.projectDescription}>
            {projects.map((project, index) => (
                <div 
                    key={`p_${index}`}
                    className={`${styles.viewPoll} ${index % 2 === 1 ? styles.even : ''}`}
                >
                    <div className={styles.caption}>
                        <h1>{project.title}</h1>
                        <h2>{project.artist}</h2>
                        <p>{project.description}</p>
                    </div>
                    <picture className={styles.picture}>
                        <img 
                            src={`/images/${project.src}`} 
                            alt={project.title} 
                        />
                    </picture>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Projects;