"use client";
import { Hamburger } from './components/hamburger';
import { Console } from './components/console';

import styles from './page.module.css'

export default function Home() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <Hamburger />
            </div>
            <Console />
        </div>
    )
}
