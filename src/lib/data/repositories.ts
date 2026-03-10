import ApiEndpoints from "@/src/lib/api/endpoints";
import ApiServiceBase from "@/src/lib/api/service";
import { Contact } from "@/src/lib/types/contact";
import { Certificate } from "@/types/certificate";
import type { Skill } from "@/types/skill";

class RepositoryBase<T extends Record<string, unknown>> {
    protected service: ApiServiceBase<T>;
    constructor(service: ApiServiceBase<T>) {
        this.service = service;
    }

    async getAll(limit?: number): Promise<T[]> {
        const params = limit !== undefined ? { limit } : undefined;
        return this.service.getAll(params);
    }
}

export class SkillRepository extends RepositoryBase<Skill> {
    static #instance: SkillRepository;

    public static get instance(): SkillRepository {
        if (!SkillRepository.#instance) {
            SkillRepository.#instance = new SkillRepository();
        }

        return SkillRepository.#instance;
    }

    private constructor() {
        super(new ApiServiceBase<Skill>(ApiEndpoints.skills.root));
    }
}

export class CertificateRepository extends RepositoryBase<Certificate> {
    static #instance: CertificateRepository;

    public static get instance(): CertificateRepository {
        if (!CertificateRepository.#instance) {
            CertificateRepository.#instance = new CertificateRepository();
        }

        return CertificateRepository.#instance;
    }

    constructor() {
        super(new ApiServiceBase<Certificate>(ApiEndpoints.certificates.root));
    }
}

export class ContactsRepository extends RepositoryBase<Contact> {
    static #instance: ContactsRepository;

    public static get instance(): ContactsRepository {
        if (!ContactsRepository.#instance) {
            ContactsRepository.#instance = new ContactsRepository();
        }

        return ContactsRepository.#instance;
    }

    constructor() {
        super(new ApiServiceBase<Contact>(ApiEndpoints.contacts.root));
    }
}
