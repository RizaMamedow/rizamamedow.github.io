"use client";

import { CertificateRepository } from "@/data/repositories";
import Slash from "@/components/common/Slash";
import TextType from "@/bits/TextType";
import Grid from "@/components/common/Grid";
import { GridItem } from "@/components/common/GridItem";
import Container from "@/components/common/Container";
import CertificateCard from "@/components/certificates/CertificateCard";
import { DataWrapper } from "@/components/common/DataWrapper";
import { useRepository } from "@/src/lib/hooks";
import LoadingText from "@/src/lib/components/common/LoadingText";

function CertificatesScreen() {
    const { data: certificates, loading, error, retry } = useRepository({
        fetchFn: () => CertificateRepository.instance.getAll()
    });

    return (
        <div className="flex justify-center items-center mt-4">
            <DataWrapper
                data={certificates}
                loading={loading}
                error={error}
                onRetry={retry}
                loadingComponent={
                    <div className="min-h-screen flex justify-center items-center">
                        <LoadingText />
                    </div>
                }
            >
                {(items) => (
                    <Container className="w-full h-full">
                        <div className="mb-3">
                            <h2 className="text-4xl font-bold">
                                <Slash className="text-primary" />
                                certificates
                            </h2>
                            <TextType
                                text={[
                                    "this my certificates :)",
                                    "on click you can go to image source",
                                ]}
                                className="ml-5"
                            />
                        </div>

                        <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 3 }} gap={4}>
                            {items.map((item, index) => (
                                <GridItem index={index} key={item.id}>
                                    <CertificateCard item={item} />
                                </GridItem>
                            ))}
                        </Grid>
                    </Container>
                )}
            </DataWrapper>
        </div>
    );
}

export default CertificatesScreen;