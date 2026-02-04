import ScrollReveal from "@/bits/ScrollReveal";
import Container from "../common/Container";


function RevealText({ text }: { text: string }) {
    return (
        <section id="reveal-text" className="w-full md:pt-10 h-max flex justify-center">
            <Container className="leading-relaxed mb-3">
                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={3}
                    blurStrength={10}
                    children={text}
                />
            </Container>
        </section>
    );
}

export default RevealText;