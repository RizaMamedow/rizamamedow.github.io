import { StateCreator } from "zustand";
import { RepositorySlice } from "@/src/lib/types/repository.slice";
import { CertificateRepository } from "@/src/lib/data/repositories";
import { Certificate } from "@/src/lib/types/certificate";

export interface CertificatesSlice {
    certificates: RepositorySlice<Certificate>;
}

export const createCertificatesSlice: StateCreator<
    CertificatesSlice,
    [],
    [],
    CertificatesSlice
> = (set, get) => ({
    certificates: {
        data: null,
        loading: false,
        error: null,

        fetch: async () => {
            if (get().certificates.data) return; 

            set((state) => ({
                certificates: { ...state.certificates, loading: true, error: null },
            }));

            try {
                const data = await CertificateRepository.instance.getAll();
                set((state) => ({
                    certificates: { ...state.certificates, data },
                }));
            } catch (e) {
                set((state) => ({
                    certificates: {
                        ...state.certificates,
                        error:
                            e instanceof Error
                                ? e.message
                                : "Failed to load certificates",
                    },
                }));
            } finally {
                set((state) => ({
                    certificates: { ...state.certificates, loading: false },
                }));
            }
        },

        retry: async () => {
            set((state) => ({
                certificates: { ...state.certificates, data: null },
            }));
            await get().certificates.fetch();
        },
    },
    
});
