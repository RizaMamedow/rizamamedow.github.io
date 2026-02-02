import TextType from "@/lib/bits/TextType";



function HeroBanner({messages}: {messages: string[]}) {
    return (
        <section
            id="hero-banner"
            className="w-full h-[90vh] flex flex-col justify-center items-center"
        >
            <h2 className="md:text-5xl sm:text-xl font-bold mb-4">
                <TextType
                    text={messages}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    deletingSpeed={50}
                    cursorBlinkDuration={0.5}
                    className="font-extrabold"
                />
            </h2>
        </section>
    );
}

export default HeroBanner;
