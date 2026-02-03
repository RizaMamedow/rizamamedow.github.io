"use client";

import { useEffect, useState } from "react";
import { SkillService } from "@/data/services";
import type { Skill } from "@/types/skill";
import TextType from "@/bits/TextType";
import ShinyText from "@/bits/ShinyText";
import { Button } from "@/components/common/Button";
import SkillsMasonry from "@/components/home/SkillMasonry";
import LoadingText from "@/components/common/LoadingText";
import Hashtag from "../common/Hashtag";

function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
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

    const clearAllStates = () => {
        setSkills([])
        setLoading(true)
        setError(null)
    }

    useEffect(() => {
        loadSkills();
    }, []);

    const LoadingSkills = () => (
        <div className="h-screen flex justify-center items-center">
            <LoadingText/>
        </div>
    );

    const ErrorScreen = ({ error }: { error: string }) => (
        <div className="h-screen flex justify-center items-center">
            <div className="w-50 flex flex-col gap-5 justify-between items-center">
                <div className="w-100 text-center">
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
                <Button
                    onClick={() => {
                        clearAllStates()
                        loadSkills()
                    }}
                >
                    You can try again!
                </Button>
            </div>
        </div>
    );

    const SkillsScreen = () => (
        <div className="h-screen w-full max-w-6xl px-4">
            <h2 className="text-left pb-10 text-5xl leading-normal  font-extrabold">
                <Hashtag className="text-primary font-montserrat" />
                my_skills
            </h2>
            <SkillsMasonry
                items={skills}
                animateFrom="center"
                stagger={0.04}
                scaleOnHover
                hoverScale={0.96}
            />
        </div>
    )

    return (
        <section
            id="skill-section"
            className="flex flex-col justify-center items-center md:pt-10"
        >
            {loading ? <LoadingSkills /> 
                : error ? <ErrorScreen error={error} /> 
                    : skills ? <SkillsScreen /> 
                        : null }
        </section>
    );
}

export default SkillsSection;
