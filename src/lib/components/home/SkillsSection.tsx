"use client";

import { useEffect, useState } from "react";
import { SkillService } from "@/data/services";
import type { Skill } from "@/types/skill";
import LoadingText from "@/components/common/LoadingText";
import Hashtag from "@/components/common/Hashtag";
import ErrorView from "@/components/common/ErrorView";
import Grid from "../common/Grid";
import { GridItem } from "../common/GridItem";
import clsx from "clsx";


const LoadingSkills = () => (
    <div className="h-screen flex justify-center items-center">
        <LoadingText/>
    </div>
);

const SkillsScreen = ({ items }: { items: Skill[] }) => (
    <div className="h-screen w-full max-w-6xl px-4">
        <h2 className="text-left pb-5 text-5xl leading-normal  font-extrabold">
            <Hashtag className="text-primary font-montserrat" />
            my_skills
        </h2>
        <Grid 
            cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} 
            gap={4}
            className=""
        >
            {items.map((item, index) => {
                return (
                    <GridItem
                        index={index}
                        key={item.id}
                    >
                        <div className={clsx(
                            "border p-4 flex justify-between items-center", 
                            "hover:scale-105"
                        )}>
                            
                            <span className="font-bold">{item.name}</span>
                            <span className="text-gray-400 text-xs">{item.category}</span>
                        </div>
                    </GridItem>
                )
            })}
        </Grid>
    </div>
)

function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const loadSkills = async () => {
        try {
            const data = await SkillService.instance.getAll();
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

    
    return (
        <section
            id="skill-section"
            className="flex flex-col justify-center items-center md:pt-10"
        >
            {loading ? <LoadingSkills /> 
                : error ? <ErrorView error={error} onClick={() => {
                    clearAllStates()
                    loadSkills()
                }} /> 
                    : skills ? <SkillsScreen items={skills} /> 
                        : null }
        </section>
    );
}

export default SkillsSection;
