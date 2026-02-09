import { StateCreator } from "zustand";
import { Contact } from "@/types/contact";
import { RepositorySlice } from "@/src/lib/types/repository.slice";
import { ContactsRepository } from "@/src/lib/data/repositories";

export interface ContactsSlice {
    contacts: RepositorySlice<Contact>;
}

export const createContactsSlice: StateCreator<
    ContactsSlice,
    [],
    [],
    ContactsSlice
> = (set, get) => ({
    contacts: {
        data: null,
        loading: false,
        error: null,

        fetch: async () => {
            if (get().contacts.loading || get().contacts.data) return; 

            set((state) => ({
                contacts: { ...state.contacts, loading: true, error: null },
            }));

            try {
                const data = await ContactsRepository.instance.getAll();
                set((state) => ({
                    contacts: { ...state.contacts, data },
                }));
            } catch (e) {
                set((state) => ({
                    contacts: {
                        ...state.contacts,
                        error:
                            e instanceof Error
                                ? e.message
                                : "Failed to load contacts",
                    },
                }));
            } finally {
                set((state) => ({
                    contacts: { ...state.contacts, loading: false },
                }));
            }
        },

        retry: async () => {
            set((state) => ({
                contacts: { ...state.contacts, data: null },
            }));
            await get().contacts.fetch();
        },
    },
});
