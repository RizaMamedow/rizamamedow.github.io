import { useEffect, useState } from "react";
import { Certificate } from "@/types/certificate";
import { CertificateRepository } from "@/data/repositories";
import Slash from "@/components/common/Slash";
import TextType from "@/bits/TextType";
import ErrorView from "@/components/common/ErrorView";
import LoadingText from "@/components/common/LoadingText";
import Grid from "@/components/common/Grid";
import { GridItem } from "@/components/common/GridItem";
import Container from "@/components/common/Container";
import CertificateCard from "@/components/certificates/CertificateCard";


function CertificatesScreen() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadSkills = async () => {
        try {
            const data = await CertificateRepository.instance.getAll();
            setCertificates(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        setCertificates([])
        setLoading(true)
        setError(null)
    }

    useEffect(() => {
        loadSkills();
    }, []);

    const ScreenContent = ({ items }: { items: Certificate[] }) => (
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

            <Grid
                cols={{ default: 1, sm: 2, lg: 3, xl: 3 }}
                gap={4}
            >
                {items.map((item, index) => {
                    return (
                        <GridItem index={index} key={item.id}>
                            <CertificateCard item={item} />
                        </GridItem>
                    );
                })}
            </Grid>
        </Container>
    );

    const LoadingScreen = () => (
        <div className="min-h-screen flex justify-center items-center">
            <LoadingText />
        </div>
    );

    return (
        <div className="flex justify-center items-center mt-4">
            {loading ? (
                <LoadingScreen />
            ) : error ? (
                <ErrorView error={error} onClick={() => {
                    clearAll()
                    loadSkills()
                }} />
            ) : certificates ? (
                <ScreenContent items={certificates} />
            ) : null}
        </div>
    );
}

export default CertificatesScreen;
