import { supabase } from "../supabase/client";
import { Certificate } from "../types/certificate";
import type { Skill } from "../types/skill";

class RepositoryBase<T extends Record<string, any>> {
    protected tableName: string;
    constructor(tableName: string) { this.tableName = tableName }

    async getAll(): Promise<T[]> {
        const { data, error } = await supabase.from(this.tableName).select("*");

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