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
        <div className={styles.hamburgerIcon} onClick={() => setClicked(!clicked)}>
            <div style={clicked ? Object.assign({}, baseClass, topBun) : baseClass}></div>
            <div style={clicked ? Object.assign({}, baseClass, middleBun) : baseClass}></div>
            <div style={clicked ? Object.assign({}, baseClass, bottomBun) : baseClass}></div>
        </div>

    );
}
