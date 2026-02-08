import clsx from "clsx";
import { useState, useEffect, useCallback } from "react";
import { Certificate } from "@/types/certificate";
import Image from "next/image";

const CertificateCard = ({ item }: { item: Certificate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const disableScroll = useCallback(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    
    useEffect(() => {
        return disableScroll();
    }, [disableScroll]);

    return (
        <>
            <div
                className={clsx(
                    "border overflow-hidden",
                    "hover:scale-105 hover:shadow-lg",
                    "cursor-pointer group block",
                )}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
                            </div>
                        </div>
                    )}

                    {hasError && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <span>Failed to load</span>
                        </div>
                    )}

                    <Image
                        src={item.url}
                        alt={`${item.technology} certificate`}
                        className={clsx(
                            "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                            isLoading && "opacity-0",
                        )}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setHasError(true);
                        }}
                        width="500"
                        height="500"
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
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-9999 flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <span className="text-5xl ml-10">×</span>
                    </button>
                    <Image
                        src={item.url}
                        alt={`${item.technology} certificate`}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                        height="1024"
                        width="1024"
                    />
                </div>
            )}
        </>
    );
};

export default CertificateCard;