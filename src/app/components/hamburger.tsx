import { useState } from 'react';

import styles from './hamburger.module.css';

export function Hamburger() {
    const [clicked, setClicked] = useState(false);

    const width = 24;
    const height = 2;

    const baseClass = {
        transform: 'rotate(0deg)',
        transition: 'all 0.5s',
        left: 0,
        right: 0,
        width: height + 'px',
        height: width + 'px',
        margin: '0px ' + (height) + 'px',
    };

    const topBun = {
        transform: `translateX(${height * 3}px) rotate(45deg)`,
        transformOrigin: '50% 50%'
    };

    const middleBun = {
        transform: `rotate(-45deg)`,
        transformOrigin: 'center'
    };

    const bottomBun = {
        transform: `translateX(-${height * 3}px) rotate(-45deg)`,
        opacity: 0,
        transformOrigin: '50% 50%'
    };

    return (
        <div>
            <div className={styles.hamburgerIcon} onClick={() => setClicked(!clicked)}>
                <div style={clicked ? Object.assign({}, baseClass, topBun) : baseClass}></div>
                <div style={clicked ? Object.assign({}, baseClass, middleBun) : baseClass}></div>
                <div style={clicked ? Object.assign({}, baseClass, bottomBun) : baseClass}></div>
                <span style={{ marginLeft: '2rem', fontFamily: 'mono', marginTop: '0.2rem' }}>Notes for Alex</span>
            </div>
            <div style={{ marginTop: '2rem', transition: 'opacity 0.5s', fontFamily: 'mono', opacity: clicked ? 1 : 0, maxWidth: '700px' }}>
                Looking at this page, I struggle with one question:<ul>
                    <li>Finding the visual and contextual bridge between what I see, work with, and understand, and how I want others to understand my work.</li>
                </ul>
                <p>
                    This is the base idea for what I think I want my portfolio to look like. Simple, interactable, and representative of what I do.
                    My interests are primarily backend work (e.g. the distributed systems at Facebook or Google that efficiently serve billions daily),
                    so I really like having the interactable command line as a means of navigating my work.
                </p>
                <p>
                    The problem is that the nature of this interest and work doesn't leave me with a large repertoire of imagery
                    that easily relate to what people outside the project might immediately understand. This has left me in a
                    weird sort of limbo between too esoteric (e.g. P2P distributed LLM inference engine) and too generic
                    (e.g. I like understanding and manipulating complex ideas into efficient tooling).
                </p>
                <p>
                    Another (I think related) issue I'm dealing with is the lack of reference points on this matter. Most other
                    personal websites I've seen of similarly interested backend engineers are those who already have made their
                    name and just put a CV with Google, Uber, etc. as their portfolio. But I think this is just a matter of exposure.
                </p>
            </div>
        </div>
    );
}
