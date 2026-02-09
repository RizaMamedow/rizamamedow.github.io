import { create } from "zustand";
import { ContactsSlice, createContactsSlice } from "./contacts.slice";
import { createSkillsSlice, SkillsSlice } from "@/src/lib/data/stores/skills.slice";
import { CertificatesSlice, createCertificatesSlice } from "@/src/lib/data/stores/certificates.slice";


type AppStore = ContactsSlice & SkillsSlice & CertificatesSlice;

export const useAppStore = create<AppStore>()((...a) => ({
    ...createContactsSlice(...a),
    ...createSkillsSlice(...a),
    ...createCertificatesSlice(...a),
}));
