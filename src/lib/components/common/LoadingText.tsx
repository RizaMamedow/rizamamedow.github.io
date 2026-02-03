import TextType from "@/bits/TextType";

const LoadingText = (
    { className = "md:text-6xl text-3xl font-extrabold" } 
    : { className?: string } 
) => (
    <h3 className={className}>
        <TextType
            text={[
                "Loading...",
                "One moment",
                "Wait a minute",
                "Just a second",
                "Hold on",
                "Give me a moment",
            ]}
            typingSpeed={75}
            pauseDuration={1000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={40}
            cursorBlinkDuration={0.3}
        />
    </h3>
)

export default LoadingText;