"use client";

import clsx from "clsx";
import Container from "./common/Container";
import { DataWrapper } from "@/src/lib/components/common/DataWrapper";
import { useAppStore } from "@/src/lib/data/stores/app.store";
import LoadingText from "@/src/lib/components/common/LoadingText";
import ContactItem from "@/src/lib/components/common/ContactItem";
import ErrorText from "@/src/lib/components/common/ErrorText";
import Link from "next/link";

function AppFooter() {
    const store = useAppStore((s) => s.contacts);
    const { data, loading, fetch, error } = store;

    return (
        <footer id="app-footer" className={clsx("border-t mt-20")}>
            <Container
                className={clsx(
                    "w-full flex justify-between  items-center p-2 flex-col",
                    "md:flex-row md:gap-4 gap-3 md:p-5",
                )}
            >
                <div>
                    <DataWrapper
                        data={data}
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
                                <ErrorText
                                    message={error}
                                    className="text-base"
                                />
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
                </div>

                <div className="text-center md:text-right">
                    <h5>© 2026 Riza Mamedow.</h5>
                    <h5>
                        Built with ❤️ and {" "}
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
            </Container>
        </footer>
    );
}

export default AppFooter;
