import { supabase } from "../supabase/client";
import { Certificate } from "../types/certificate";
import type { Skill } from "../types/skill";

class DataService<T extends Record<string, any>> {
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

export class SkillService extends DataService<Skill> {
    static #instance: SkillService

    public static get instance(): SkillService {
        if (!SkillService.#instance) {
            SkillService.#instance = new SkillService();
        }

        return SkillService.#instance;
    }

    constructor() {
        super("skills")
    }
}

export class CertificateService extends DataService<Certificate> {
    static #instance: CertificateService

    public static get instance(): CertificateService {
        if (!CertificateService.#instance) {
            CertificateService.#instance = new CertificateService();
        }

        return CertificateService.#instance;
    }

    constructor() {
        super("certificates")
    }
}