import CertificatesScreen from "@/src/lib/components/certificates/CertificatesScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "certificates | rizamamedow",
    description: "it's my certificates",
};

export default function Certificates() {
    return (
        <main id="certificates_page">
            <CertificatesScreen />
        </main>
    );
}
