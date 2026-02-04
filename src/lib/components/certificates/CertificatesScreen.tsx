import { useEffect, useState } from "react";
import { Certificate } from "../../types/certificate";
import { CertificateService } from "../../data/services";
import Slash from "../common/Slash";
import TextType from "../../bits/TextType";
import ErrorView from "../common/ErrorView";
import LoadingText from "../common/LoadingText";
import Grid from "../common/Grid";
import { GridItem } from "../common/GridItem";
import clsx from "clsx";

const CertificateCard = ({ item }: { item: Certificate }) => (
    <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
            "border rounded-lg overflow-hidden",
            "hover:scale-105 hover:shadow-lg transition-all duration-300",
            "cursor-pointer group block",
        )}
    >
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
            <img
                src={item.url}
                alt={`${item.technology} certificate`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
        </div>

        <div className="p-4 flex flex-col gap-2">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">
                {item.technology}
            </h3>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.source}</span>
                <span className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </div>
    </a>
);

function CertificatesScreen() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadSkills = async () => {
        try {
            const data = await CertificateService.instance.getAll();
            setCertificates(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const ScreenContent = ({ items }: { items: Certificate[] }) => (
        <div className="lg:px-50 px-10 w-full h-full">
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
                cols={{ default: 1, sm: 2, lg: 2, xl: 3 }}
                gap={4}
                className=""
            >
                {items.map((item, index) => {
                    return (
                        <GridItem index={index} key={item.id}>
                            <CertificateCard item={item} />
                        </GridItem>
                    );
                })}
            </Grid>
        </div>
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
                <ErrorView error={error} />
            ) : certificates ? (
                <ScreenContent items={certificates} />
            ) : null}
        </div>
    );
}

export default CertificatesScreen;
