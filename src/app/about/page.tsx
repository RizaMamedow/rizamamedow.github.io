import ASCIIText from "@/src/lib/bits/ASCIIText";
import Container from "@/src/lib/components/common/Container";
import Slash from "@/src/lib/components/common/Slash";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "about | rizamamedow",
    description: "it's page with information about me.",
};

export default function About() {
    const paragraphDefaultClasses: string = "text-lg font-medium mt-10 mb-4 ";

    return (
        <main id="about_page">
            <Container>
                <h1 className="text-4xl font-black">
                    <Slash className="text-primary" />
                    about_me
                </h1>

                <div className="flex flex-col-reverse md:flex-row md:gap-8 md:mt-10">
                    {/* TEXT — 50% */}
                    <div className="w-full md:w-1/2">
                        <p className={clsx(paragraphDefaultClasses)}>
                            Hi! My name is Riza, and I{"\'"}m a software
                            developer passionate about creating clean,
                            efficient, and user-friendly applications.
                        </p>
                        <p className={clsx(paragraphDefaultClasses)}>
                            I work with modern technologies, love learning new
                            tools, and am constantly improving my skills by
                            participating in real-world projects and
                            contributing to open source software development.
                        </p>
                        <p className={clsx(paragraphDefaultClasses)}>
                            This website is where you can learn more about me.
                        </p>
                    </div>

                    {/* ASCII — 50% */}
                    <div className="w-full md:w-1/2 relative h-80 md:h-100">
                        <ASCIIText
                            text="Hi!"
                            asciiFontSize={5}
                            enableWaves={false}
                        />
                    </div>
                </div>
            </Container>
        </main>
    );
}
