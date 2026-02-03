import { supabase } from "../supabase/client";
import type { Skill } from "../types/skill";

const TABLE_NAME = "skills";

export const SkillService = {
    async getAll(): Promise<Skill[]> {
        const { data, error } = await supabase.from(TABLE_NAME).select("*");

        if (error) {
            console.error("[SkillService.getAll]", error);
            throw error;
        }

        return data ?? [];
    },
};
