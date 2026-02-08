// code source: https://reactbits.dev/
"use client";

import {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { gsap } from "gsap";

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string | string[];
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    textColors?: string[];
    variableSpeed?: { min: number; max: number };
    onSentenceComplete?: (sentence: string, index: number) => void;
    startOnVisible?: boolean;
    reverseMode?: boolean;
}

const TextType = ({
    text,
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = "",
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = "|",
    cursorClassName = "",
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);

    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = useCallback(() => {
        if (!textColors.length) return undefined;
        return textColors[currentTextIndex % textColors.length];
    }, [textColors, currentTextIndex]);

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsVisible(true);
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    // Cursor blink animation
    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    // Typing effect
    useEffect(() => {
        if (!isVisible) return;

        let timeout: ReturnType<typeof setTimeout>;

        const currentText = reverseMode
            ? textArray[currentTextIndex].split("").reverse().join("")
            : textArray[currentTextIndex];

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (!displayedText) {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;

                    if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);

                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => {}, pauseDuration);
                } else {
                    timeout = setTimeout(() => setDisplayedText((prev) => prev.slice(0, -1)), deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev + currentText[currentCharIndex]);
                        setCurrentCharIndex((prev) => prev + 1);
                    }, variableSpeed ? getRandomSpeed() : typingSpeed);
                } else if (!loop && currentTextIndex === textArray.length - 1) return;
                else {
                    timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };

        if (!displayedText && !isDeleting && currentCharIndex === 0) {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        getRandomSpeed,
        onSentenceComplete,
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping &&
        (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return (
        <div ref={containerRef} className={`inline-block whitespace-pre-wrap tracking-tight ${className}`} {...props}>
            <span style={{ color: getCurrentTextColor() || "inherit" }}>{displayedText}</span>
            {showCursor && (
                <span
                    ref={cursorRef}
                    className={`ml-1 inline-block ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
                >
                    {cursorCharacter}
                </span>
            )}
        </div>
    );
};

export default TextType;
