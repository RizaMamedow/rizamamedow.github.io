"use client";

import HeroBanner from "@/components/home/HeroBanner";
import RevealText from "@/components/home/RevealText";
import SkillsSection from "@/components/home/SkillsSection";
import CertificatesSection from "@/src/lib/components/home/CertificatesSection";

const bannerText: string[] = [
    "Hi I'm Riza Mamedow",
    "I'm a developer",
    "Go ahead, explore my site!",
];

const revealText: string = "\"The path of trial and mistakes gave me invaluable experience that money cannot buy. I am convinced that development is a process with no expiration date, and that a willingness to learn is the only way to stay relevant in a changing world.\""

export default function Home() {
    return (
        <main id="home_page">
            <HeroBanner messages={bannerText} />
            <RevealText text={revealText}/>
            <SkillsSection />
            <br className="p-5" />
            <CertificatesSection/>
        </main>
    );
}
