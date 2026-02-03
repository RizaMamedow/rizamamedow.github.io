import ScrollReveal from "@/bits/ScrollReveal";


function RevealText({ text }: { text: string }) {
    return (
        <section id="reveal-text" className="w-full md:pt-10 h-max flex justify-center">
            <div className="w-4/5 leading-relaxed mb-9">
                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={3}
                    blurStrength={10}
                >
                    { text }
                </ScrollReveal>
            </div>
        </section>
    );
}

export default RevealText;