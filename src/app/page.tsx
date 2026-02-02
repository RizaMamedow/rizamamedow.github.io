"use client";

import ScrollReveal from "../lib/bits/ScrollReveal";
import TextType from "../lib/bits/TextType";
import HeroBanner from "../lib/components/home/HeroBanner";
import RevealText from "../lib/components/home/RevealText";


const bannerText: string[] = [
    "Hi I'm Riza Mamedow",
    "I'm a developer",
    "Go ahead, explore my site!",
];

export default function Home() {
    return (
        <main id="homepage">
          <HeroBanner messages={bannerText} />
          <RevealText text={"The path of trial and mistakes gave me invaluable experience that money cannot buy. I am convinced that development is a process with no expiration date, and that a willingness to learn is the only way to stay relevant in a changing world."}/>
        </main>
    );
}
