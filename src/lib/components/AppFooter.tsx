"use client";

import clsx from "clsx";
import Container from "./common/Container";
import { DataWrapper } from "@/src/lib/components/common/DataWrapper";
import { useAppStore } from "@/src/lib/data/stores/app.store";
import LoadingText from "@/src/lib/components/common/LoadingText";
import ContactItem from "@/src/lib/components/common/ContactItem";
import ErrorText from "@/src/lib/components/common/ErrorText";
import Link from "next/link";
import { useMemo } from "react";
import { RepositorySlice } from "@/src/lib/types/repository.slice";
import { Contact } from "@/src/lib/types/contact";
import Hashtag from "@/src/lib/components/common/Hashtag";
import { routes } from "@/src/lib/routes";

const ContactsView = ({
    data,
    loading,
    fetch,
    error,
}: RepositorySlice<Contact>) => {
    const preview = useMemo(() => data?.slice(0, 3) ?? null, [data]);
    return (
        <DataWrapper
            data={preview}
            loading={loading}
            error={error}
            fetch={fetch}
            loadingComponent={
                <div>
                    <LoadingText className="text-base" />
                </div>
            }
            errorComponent={(error) => (
                <div>
                    <ErrorText message={error} className="text-base" />
                </div>
            )}
        >
            {(items) => (
                <div className="flex gap-2">
                    {items.map((item, index) => (
                        <ContactItem key={index} data={item} />
                    ))}
                </div>
            )}
        </DataWrapper>
    );
};

function AppFooter() {
    const store = useAppStore((s) => s.contacts);

    return (
        <footer id="app-footer" className={clsx("border-t mt-20")}>
            <Container className={clsx("w-full", "md:gap-4 gap-3 md:p-5")}>
                <div className="flex justify-between items-center">
                    <div>
                        <ContactsView {...store} />
                    </div>

                    <div className="text-center md:text-right">
                        <h5>© 2026 Riza Mamedow.</h5>
                        <h5>
                            Built with ❤️ and{" "}
                            <Link
                                href="https://github.com/RizaMamedow/rizamamedow.github.io"
                                className="hover:underline"
                                target="_blank"
                            >
                                open source
                            </Link>
                            .
                        </h5>
                    </div>
                </div>

                <nav className="mt-10">
                    <h6 className="font-medium mb-2">navigation:</h6>

                    <ul className="space-y-2 text-sm">
                        {routes.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.url}
                                    className="hover:underline font-medium"
                                >
                                    <Hashtag className="text-primary font-montserrat" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </footer>
    );
}

export default AppFooter;
