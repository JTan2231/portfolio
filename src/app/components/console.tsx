import { useEffect, useState } from 'react';

import styles from './console.module.css';
import common from './common.module.css';

function createDiv(content: string, userInput: boolean) {
    const newDiv = document.createElement('div');
    newDiv.style.whiteSpace = 'pre';
    newDiv.style.userSelect = 'none';

    newDiv.textContent = (userInput ? '>' : ' ') + content;

    return newDiv;
}

function createSpan(content: string) {
    const newDiv = document.createElement('div');
    newDiv.style.whiteSpace = 'pre';
    newDiv.style.userSelect = 'none';

    newDiv.textContent = ' ' + content;

    return newDiv;
}

function createAnchor(href: string, label: string) {
    const newAnchor = document.createElement('a');
    newAnchor.style.whiteSpace = 'pre';

    newAnchor.classList.add(common.hyperlink);

    newAnchor.href = href;
    newAnchor.textContent = label;

    return newAnchor;
}

function linkDescriptionLine(href: string, label: string, description: string) {
    const span = document.createElement('span');
    span.style.display = 'flex';
    span.style.whiteSpace = 'pre';

    span.appendChild(createSpan(''));
    span.appendChild(createAnchor(href, label));
    span.appendChild(createSpan(description));

    return span;
}

function appendToHistory(content: string, userInput: boolean = false) {
    document.getElementById('consoleHistory')!.appendChild(createDiv(content, userInput));
}

function appendElementToHistory(element: HTMLElement) {
    document.getElementById('consoleHistory')!.appendChild(element);
}

function ls() {
    const names = ['about', 'github', 'hivemind', 'eidetic', 'leetcode', 'linkedin', 'email'];

    const getPadding = (name: string) => {
        let highestDifference = 0;
        for (const n of names) {
            highestDifference = Math.max(highestDifference, n.length - name.length);
        }

        return (highestDifference > 0 ? ' '.repeat(highestDifference) : '') + ': ';

    }

    appendElementToHistory(linkDescriptionLine('https://jtan2231.github.io', 'about', getPadding('about') + 'my name is Joey Tan, I\'m a software developer. I like programming and math.'));
    appendElementToHistory(linkDescriptionLine('https://github.com/jtan2231/', 'github', getPadding('github') + 'my github profile'));
    appendElementToHistory(linkDescriptionLine('https://github.com/jtan2231/hivemind', 'hivemind', getPadding('hivemind') + 'distributed P2P neural network inference'));
    appendElementToHistory(linkDescriptionLine('https://github.com/jtan2231/eidetic-desktop', 'eidetic', getPadding('eidetic') + 'note-taking with LLM embedding lookup'));
    appendElementToHistory(linkDescriptionLine('https://leetcode.com/jtan2231', 'leetcode', getPadding('leetcode') + 'practicing my algorithmic proficiency'));
    appendElementToHistory(linkDescriptionLine('https://are.na/joey-tan/', 'are.na', getPadding('are.na') + 'my are.na profile'));
    appendElementToHistory(linkDescriptionLine('https://www.linkedin.com/in/joseph-tan-478aa5186/', 'linkedin', getPadding('linkedin') + 'my linkedin profile'));
    appendElementToHistory(linkDescriptionLine('mailto:j.tan2231@gmail.com', 'email', getPadding('email') + 'j.tan2231@gmail.com'));
}

function clear() {
    document.getElementById('consoleHistory')!.innerHTML = '';
}

function helpText(message: string) {
    const div = createDiv(message, false);
    div.style.color = 'red';

    appendElementToHistory(div);
}

function openWindow(url: string) {
    const open = window.open(url, '_blank');
    if (!open) {
        helpText('enable pop-ups!');
    }
}

function cd(where: string) {
    if (where === 'about') {
        openWindow('https://jtan2231.github.io');
    }
    else if (where === 'github') {
        openWindow('https://github.com/jtan2231');
    }
    else if (where === 'hivemind') {
        openWindow('https://github.com/jtan2231/hivemind');
    }
    else if (where === 'eidetic') {
        openWindow('https://github.com/jtan2231/eidetic-desktop');
    }
    else if (where === 'leetcode') {
        openWindow('https://leetcode.com/jtan2231');
    }
    else if (where === 'are.na') {
        openWindow('https://are.na/joey-tan');
    }
    else if (where === 'linkedin') {
        openWindow('https://www.linkedin.com/in/joseph-tan-478aa5186/');
    }
    else if (where === 'email') {
        openWindow('mailto:j.tan2231@gmail.com');
    }
    else if (where.includes('http')) {
        openWindow(where);
    }
    else {
        helpText(`cd: ${where}: No such file or directory`);
    }
}

function help() {
    appendToHistory('JT Portfolio, version 1.0.0-10-7-23-release');
    appendToHistory('These shell commands are defined internally. Type `help` to see this list.')
    appendToHistory('Type `help name` to find out more about the function `name`.')
    appendToHistory('Bold words are clickable links.')
    appendToHistory('');
    appendToHistory(' ls');
    appendToHistory(' cd [project name]');
    appendToHistory(' clear');
}

function helpWithArg(name: string) {
    if (name === 'ls') {
        appendToHistory('ls: ls');
        appendToHistory('    A listing of my relevant projects and social media.');
        appendToHistory('    Bold words are clickable links.');
    }
    else if (name === 'cd') {
        appendToHistory('cd: cd [name | url]');
        appendToHistory('    Open a new tab for the given project or social media name.');
        appendToHistory('    Supports arbitrary URLs (e.g. `cd https://www.google.com`).');
    }
    else if (name === 'clear') {
        appendToHistory('clear: clear');
        appendToHistory('    Clears the console history.');
    }
    else {
        helpText('help: no help topics match `' + name + '`.');
    }
}

export function Console() {
    const [loaded, setLoaded] = useState(false);

    const consoleKeyPress = (e: any) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();

            const inputText = (e.target.textContent || e.target.innerText).trim();
            appendToHistory(inputText, true);

            if (inputText.length === 0) {
                e.target.textContent = '';
                return;
            }

            const tokens = inputText.split(' ');
            appendToHistory(tokens, false);
            const command = tokens[0];

            const argCheck = (argCount: number, usageMessage: string) => {
                if (tokens.length > argCount) {
                    helpText(usageMessage);
                    return false;
                }

                return true;
            }

            if (command === 'ls') {
                if (argCheck(1, 'usage: ls')) {
                    ls();
                }
            }
            else if (command === 'clear') {
                if (argCheck(1, 'usage: clear')) {
                    clear();
                }
            }
            else if (command === 'cd') {
                if (argCheck(2, 'usage: cd [project name]')) {
                    cd(tokens[1]);
                }
            }
            else if (command === 'help') {
                if (tokens.length === 1) {
                    help();
                }
                else if (argCheck(2, 'usage: help [function]')) {
                    helpWithArg(tokens[1]);
                }
            }
            else {
                helpText(command + ': command not found');
            }

            e.target.textContent = '';
        }
    };

    useEffect(() => {
        if (document.getElementById('consoleHistory')!.childNodes.length === 0) {
            help();
            appendToHistory('ls', true);
            ls();
        }

        const handleTyping = (e: any) => {
            if (e.target.id !== 'consoleInput') {
                const div = document.getElementById('consoleInput');
                if (div) {
                    div.focus();

                    const range = document.createRange();
                    const sel = window.getSelection()!;

                    range.setStart(div, div.childNodes.length);
                    range.collapse(true);

                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        };

        document.addEventListener('keydown', handleTyping);

        return () => {
            document.removeEventListener('keydown', handleTyping);
        };
    }, []);

    return (
        <div className={styles.consoleContainer}>
            <div className={styles.consoleHistory} id="consoleHistory" />
            <div className={styles.consoleInputContainer}>
                <span className={styles.prompt}>{'>'}</span>
                <span>
                    <span className={styles.input} contentEditable spellCheck={false} id="consoleInput" onKeyDown={consoleKeyPress} />
                    <span className={styles.caret}>{'o'}</span>
                </span>
            </div>
        </div>
    );
}
