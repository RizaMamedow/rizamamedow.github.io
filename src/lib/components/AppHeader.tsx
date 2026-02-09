"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ShinyText from "@/bits/ShinyText";
import clsx from "clsx";
import Container from "./common/Container";
import { Route, routes } from "@/src/lib/routes";


const Brand = () => (
    <ShinyText
        text="rizamamedow"
        textClassName="lg:text-2xl text-lg font-medium"
        speed={2}
        delay={0}
        color="#bbbbbb"
        shineColor="#ffffff"
        spread={120}
        direction="left"
        yoyo={true}
        pauseOnHover={false}
        disabled={false}
    />
);

const NavHashtag = ({ href, pathname }: { href: string, pathname: string }) => {
    if (pathname === href) return <span className="font-montserrat text-primary">#</span>;
    else return <span className="font-montserrat text-secondary">#</span>;
};

const Label = ({ item, pathname }: { item: Route, pathname: string  }) => {
    const isActive = pathname === item.url;
    const labelClassNames = clsx(
        "text-base font-medium",
        isActive ? "text-white hover:opacity-80" : "text-white hover:text-primary",
    );

    return <span className={labelClassNames}>{item.label}</span>;
};

const NavItem = ({ item, pathname }: { item: Route, pathname: string  }) => (
    <Link
        href={item.url}
        className={clsx(
            "text-base",
            "font-medium",
            "transition-all",
            "duration-300",
        )}
    >
        <NavHashtag href={item.url} pathname={pathname} />
        <Label item={item} pathname={pathname} />
    </Link>
);

function AppHeader() {
    const pathname = usePathname();

    return (
        <header id="app-header" className={clsx(
            "w-full sticky top-0 z-1000",
            "backdrop-blur-md",
            "bg-background",
            "transition-all duration-300"
        )}>
            <Container className={clsx(
                "w-full flex justify-between  items-center p-2 flex-col",
                "md:flex-row md:gap-4 md:p-5"
            )}>
                <div className="">
                    <Link href="/">
                        <Brand />
                    </Link>
                </div>

                <div className="">
                    <ul className="list-none m-0 p-0.75 flex gap-0.75">
                        {routes.map((item) => (
                            <li key={item.url} className="px-2">
                                <NavItem item={item} pathname={pathname} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </header>
    );
}

export default AppHeader;
