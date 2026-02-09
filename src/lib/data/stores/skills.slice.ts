import { StateCreator } from "zustand";
import { RepositorySlice } from "@/src/lib/types/repository.slice";
import { ContactsRepository, SkillRepository } from "@/src/lib/data/repositories";
import { Skill } from "@/src/lib/types/skill";

export interface SkillsSlice {
    skills: RepositorySlice<Skill>;
}

export const createSkillsSlice: StateCreator<
    SkillsSlice,
    [],
    [],
    SkillsSlice
> = (set, get) => ({
    skills: {
        data: null,
        loading: false,
        error: null,

        fetch: async () => {
            if (get().skills.data) return; 

            set((state) => ({
                skills: { ...state.skills, loading: true, error: null },
            }));

            try {
                const data = await SkillRepository.instance.getAll();
                set((state) => ({
                    skills: { ...state.skills, data },
                }));
            } catch (e) {
                set((state) => ({
                    skills: {
                        ...state.skills,
                        error:
                            e instanceof Error
                                ? e.message
                                : "Failed to load skills",
                    },
                }));
            } finally {
                set((state) => ({
                    skills: { ...state.skills, loading: false },
                }));
            }
        },

        retry: async () => {
            set((state) => ({
                skills: { ...state.skills, data: null },
            }));
            await get().skills.fetch();
        },
    },
});
