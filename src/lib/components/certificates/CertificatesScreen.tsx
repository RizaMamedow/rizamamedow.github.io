"use client";

import Slash from "@/components/common/Slash";
import TextType from "@/bits/TextType";
import Grid from "@/components/common/Grid";
import { GridItem } from "@/components/common/GridItem";
import Container from "@/components/common/Container";
import CertificateCard from "@/components/certificates/CertificateCard";
import { DataWrapper } from "@/components/common/DataWrapper";
import LoadingText from "@/src/lib/components/common/LoadingText";
import { useAppStore } from "@/src/lib/data/stores/app.store";

function CertificatesScreen() {
    const data = useAppStore((s) => s.certificates.data);
    const loading = useAppStore((s) => s.certificates.loading);
    const error = useAppStore((s) => s.certificates.error);
    const fetch = useAppStore((s) => s.certificates.fetch);

    return (
        <div className="flex justify-center items-center mt-4">
            <Container className="w-full h-full">
                <div className="mb-3">
                    <h1 className="text-4xl font-bold">
                        <Slash className="text-primary" />
                        certificates
                    </h1>
                    <TextType
                        text={[
                            "this my certificates :)",
                            "on click you can go to image source",
                        ]}
                        className="ml-5"
                    />
                </div>
                <DataWrapper
                    data={data}
                    loading={loading}
                    error={error}
                    fetch={fetch}
                    loadingComponent={
                        <div className="min-h-screen flex justify-center items-center">
                            <LoadingText />
                        </div>
                    }
                >
                    {(items) => (
                        <Grid
                            cols={{ default: 1, sm: 2, lg: 3, xl: 3 }}
                            gap={4}
                        >
                            {items.map((item, index) => (
                                <GridItem index={index} key={item.id}>
                                    <CertificateCard item={item} />
                                </GridItem>
                            ))}
                        </Grid>
                    )}
                </DataWrapper>
            </Container>
        </div>
    );
}

export default CertificatesScreen;
