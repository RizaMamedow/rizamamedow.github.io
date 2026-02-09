// SkillsSection.tsx
"use client";

import { SkillRepository } from "@/src/lib/data/repositories";
import Hashtag from "@/components/common/Hashtag";
import Grid from "@/components/common/Grid";
import { GridItem } from "@/components/common/GridItem";
import Container from "@/components/common/Container";
import { DataWrapper } from "@/components/common/DataWrapper";
import clsx from "clsx";
import { useRepository } from "@/src/lib/hooks";
import { useAppStore } from "@/src/lib/data/stores/app.store";

function SkillsSection() {
    const data = useAppStore((s) => s.skills.data);
    const loading = useAppStore((s) => s.skills.loading);
    const error = useAppStore((s) => s.skills.error);
    const fetch = useAppStore((s) => s.skills.fetch);

    return (
        <section
            id="skill-section"
            className="flex flex-col justify-center items-center md:pt-10"
        >
            <Container className="w-full">
                <h2 className="text-left pb-5 md:text-5xl text-3xl leading-normal font-extrabold">
                    <Hashtag className="text-primary font-montserrat" />
                    my_skills
                </h2>

                <DataWrapper
                    data={data}
                    loading={loading}
                    error={error}
                    fetch={fetch}
                >
                    {(items) => (
                        <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} gap={4}>
                            {items.map((item, index) => (
                                <GridItem index={index} key={item.id}>
                                    <div
                                        className={clsx(
                                            "border p-3 flex justify-between items-center",
                                            "hover:scale-105"
                                        )}
                                    >
                                        <span className="font-bold">{item.name}</span>
                                        <span className="text-gray-400 text-xs">
                                            {item.category}
                                        </span>
                                    </div>
                                </GridItem>
                            ))}
                        </Grid>
                    )}
                </DataWrapper>
            </Container>
        </section>
    );
}

export default SkillsSection;