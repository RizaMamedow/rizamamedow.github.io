import clsx from "clsx";
import { useState } from "react";
import { Certificate } from "../../types/certificate";

const CertificateCard = ({ item }: { item: Certificate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "border overflow-hidden",
                "hover:scale-105 hover:shadow-lg",
                "cursor-pointer group block",
            )}
        >
            <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex gap-1">
                            <span
                                className="w-2 h-2 bg-secondary rounded-full animate-pulse"
                                style={{ animationDelay: "0s" }}
                            />
                            <span
                                className="w-2 h-2 bg-secondary rounded-full animate-pulse"
                                style={{ animationDelay: "0.3s" }}
                            />
                            <span
                                className="w-2 h-2 bg-secondary rounded-full animate-pulse"
                                style={{ animationDelay: "0.6s" }}
                            />
                        </div>
                    </div>
                )}

                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span>Failed to load</span>
                    </div>
                )}

                <img
                    src={item.url}
                    alt={`${item.technology} certificate`}
                    className={clsx(
                        "w-full h-full object-cover group-hover:scale-110 ",
                        isLoading && "opacity-0",
                    )}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-lg group-hover:text-primary truncate">
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
};

export default CertificateCard;
