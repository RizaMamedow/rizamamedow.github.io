"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Container from "./common/Container";


function AppFooter() {

    return (
        <footer id="app-footer" className={clsx(
            "border-t mt-20"
        )}>
            <Container className={clsx(
                "w-full flex justify-between  items-center p-2 flex-col",
                "md:flex-row md:gap-4 md:p-5"
            )}>
                
            </Container>
        </footer>
    );
}

export default AppFooter;
