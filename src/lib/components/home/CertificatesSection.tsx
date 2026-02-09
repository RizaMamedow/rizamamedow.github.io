"use client";

import CertificateCard from "@/src/lib/components/certificates/CertificateCard";
import { Button } from "@/src/lib/components/common/Button";
import Container from "@/src/lib/components/common/Container";
import Grid from "@/src/lib/components/common/Grid";
import { GridItem } from "@/src/lib/components/common/GridItem";
import Hashtag from "@/src/lib/components/common/Hashtag";
import { DataWrapper } from "@/src/lib/components/common/DataWrapper";
import Link from "next/link";
import { useAppStore } from "@/src/lib/data/stores/app.store";
import { useMemo } from "react";

function CertificatesSection() {
    const store = useAppStore((s) => s.certificates );
    const { data, loading, fetch, error } = store;

    const preview = useMemo(
        () => data?.slice(0, 3) ?? null,
        [data]
    );

    return (
        <section id="certificates">
            <div className="py-4">
                <Container className="w-full h-full">
                    <div className="mb-5">
                        <h2 className="md:text-5xl text-3xl font-bold">
                            <Link href="/certificates">
                                <Hashtag className="text-primary font-montserrat" />
                                <span className="hover:underline">certificates</span>
                            </Link>
                        </h2>
                    </div>

                    <DataWrapper
                        data={preview}
                        loading={loading}
                        error={error}
                        fetch={fetch}
                    >
                        {(items) => (
                            <>
                                <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 3 }} gap={4}>
                                    {items.map((item, index) => (
                                        <GridItem index={index} key={item.id}>
                                            <CertificateCard item={item} />
                                        </GridItem>
                                    ))}
                                </Grid>
                                <div className="w-full flex justify-center pt-4">
                                    <Link href="/certificates">
                                        <Button className="hover:cursor-alias">Click to see more!</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </DataWrapper>
                </Container>
            </div>
        </section>
    );
}

export default CertificatesSection;