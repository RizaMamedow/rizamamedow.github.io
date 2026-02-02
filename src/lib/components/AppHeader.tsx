"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ShinyText from "../bits/ShinyText";
import clsx from "clsx";

type NavItemProps = {
    label: string;
    href: string;
};

let items: NavItemProps[] = [
    {
        label: "home",
        href: "/",
    },
    {
        label: "about",
        href: "/about",
    },
    {
        label: "certificates",
        href: "/certs",
    },
];

function AppHeader() {
    const pathname = usePathname();

    const Brand = () => (
        <ShinyText
            text="Riza-Mamedow"
            textClassName="text-2xl font-bold"
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

    const Hashtag = ({ href }: { href: string }) => {
        if (pathname === href) return <span className="text-primary">#</span>;
        else return <span className="text-secondary">#</span>;
    };

    const Label = ({ item }: { item: NavItemProps }) => {
        const isActive = pathname === item.href;
        const labelClassNames = clsx(
            "text-base font-medium",
            isActive ? "text-white hover:opacity-80" : "text-white hover:text-primary",
        );

        return <span className={labelClassNames}>{item.label}</span>;
    };

    const NavItem = ({ item }: { item: NavItemProps }) => (
        <Link
            href={item.href}
            className={clsx(
                "text-base",
                "font-medium",
                "transition-all",
                "duration-300",
            )}
        >
            <Hashtag href={item.href} />
            <Label item={item} />
        </Link>
    );

    return (
        <header id="app-header" className="w-full fixed z-1000">
            <div className="w-full flex justify-around items-center p-5 md:flex-row flex-col gap-4">
                <div className="">
                    <Link href="/">
                        <Brand />
                    </Link>
                </div>

                <div className="">
                    <ul className="list-none m-0 p-0.75 flex gap-0.75">
                        {items.map((item) => (
                            <li key={item.href} className="px-2">
                                <NavItem item={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
