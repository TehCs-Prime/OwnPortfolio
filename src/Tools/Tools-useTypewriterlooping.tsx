import { useEffect, useState } from 'react'

const useTypewriterlooping = (words: string[], speed: number, pause: number, loop: boolean = true,  startTrigger: boolean = true) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    speed = Math.max(30, speed + (Math.random() * 100 * 2 - 100));
    pause = Math.max(50, pause + (Math.random() * 50 * 2 - 50));

     // don’t start typing until startTrigger === true
    useEffect(() => {
        if (!startTrigger) return; // skip until visible
    }, [startTrigger]);

    useEffect(() => {
        if (words.length === 0 || isFinished || !startTrigger)
            return;

        const currentWord = words[currentWordIndex % words.length];
        const isLastWord = currentWordIndex === (words.length - 1);

        const timeout = setTimeout(()=>{
        //Loop within a word to be display
        //Condition 1 : Typing 
        if (!isDeleting && currentCharIndex < currentWord.length){
            setDisplayedText((displayedText)=> displayedText + currentWord[currentCharIndex]);
            setCurrentCharIndex((currentCharIndex)=>currentCharIndex+1);
        }
        //Condition 2 : Done Typing (pause a while)
        else if (!isDeleting && currentCharIndex === currentWord.length)
        {
            if (!loop && isLastWord) {
                setIsFinished(true);
            } else {
                setIsDeleting(true);
            }
        }
        //Condition 3 : Deleting
        else if (isDeleting && currentCharIndex >0){
            setDisplayedText(currentWord.slice(0, currentCharIndex - 1));
            setCurrentCharIndex((currentCharIndex)=>currentCharIndex-1)
        }
        //Switch new word to display
        else if (isDeleting && currentCharIndex ===0){
            if (!loop && isLastWord) {
                setIsFinished(true); // Stop the effect
            } 
            else {
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                setIsDeleting(false);
            }
        }

        }, isDeleting ? speed : (currentCharIndex === currentWord.length ? pause : speed));

        return () => clearTimeout(timeout);

    }, [currentWordIndex, currentCharIndex, isDeleting, words, speed, pause, loop, isFinished,startTrigger]);

    return (
        <>
            {displayedText}
            <span className="blinking-cursor">▌</span>
            {/* hide !isFinished makes the blinking cursor stay after finish*/}
        </>
    );
};

export default useTypewriterlooping;

/*
Example usage:
const text = useTypewriterlooping([word1, word2, wordN], typeSpeed(ms), deleteSpeed(ms) );
return <p> {text} </p>;
*/