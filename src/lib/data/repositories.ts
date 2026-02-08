import { supabase } from "@/supabase/client";
import { Certificate } from "@/types/certificate";
import type { Skill } from "@/types/skill";

class RepositoryBase<T extends Record<string, unknown>> {
    protected tableName: string;
    constructor(tableName: string) { this.tableName = tableName }

    async getAll(limit?: number): Promise<T[]> {
        let query = supabase
            .from(this.tableName)
            .select("*");

        if (limit !== undefined) {
            query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) {
            throw error;
        }
        return data ?? [];
    }
}

export class SkillRepository extends RepositoryBase<Skill> {
    static #instance: SkillRepository

    public static get instance(): SkillRepository {
        if (!SkillRepository.#instance) {
            SkillRepository.#instance = new SkillRepository();
        }

        return SkillRepository.#instance;
    }

    constructor() {
        super("skills")
    }
}

export class CertificateRepository extends RepositoryBase<Certificate> {
    static #instance: CertificateRepository

    public static get instance(): CertificateRepository {
        if (!CertificateRepository.#instance) {
            CertificateRepository.#instance = new CertificateRepository();
        }

        return CertificateRepository.#instance;
    }

    constructor() {
        super("certificates")
    }
}