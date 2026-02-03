"use client";

import React from "react";
import { SkillService } from "@/lib/data/services";
import type { Skill } from "@/lib/types/skill";
import TextType from "../../bits/TextType";
import Masonry from "./SkillMasonry";
import ShinyText from "../../bits/ShinyText";

function SkillsSection() {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await SkillService.getAll();
                setSkills(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load skills");
            } finally {
                setLoading(false);
            }
        };

        loadSkills();
    }, []);

    const LoadingSkills = () => (
        <div className="h-screen flex justify-center items-center">
            <h3 className="text-2xl font-extrabold">
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
        </div>
    );

    const ErrorScreen = ({ error }: { error: string }) => (
        <div className="h-screen flex justify-center items-center">
            <h3 className="text-2xl text-red-500">
                <span className="font-bold mr-2">{"Error >"}</span>
                <TextType
                    text={[error]}
                    typingSpeed={75}
                    pauseDuration={1000}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={40}
                    cursorBlinkDuration={0.3}
                    loop={false}
                />
            </h3>
        </div>
    );

    if (loading) return <LoadingSkills />;
    if (error) return <ErrorScreen error={error} />;

    return (
        <section
            id="skill-section"
            className="min-h-screen flex flex-col justify-center items-center"
        >
            <div className="w-full max-w-6xl px-4">
                <h2 className="text-left pb-10 text-5xl">
                    <ShinyText
                        text="My skills:"
                        textClassName="font-bold"
                        speed={2}
                        delay={0}
                        color="#bbbbbb"
                        shineColor="#ffffff"
                        spread={120}
                        direction="left"
                        yoyo={true}
                        pauseOnHover={false}
                        disabled={false}
                    />
                </h2>
                <Masonry
                    items={skills}
                    animateFrom="bottom"
                    stagger={0.04}
                    scaleOnHover
                    hoverScale={0.96}
                />
            </div>
        </section>
    );
}

export default SkillsSection;
