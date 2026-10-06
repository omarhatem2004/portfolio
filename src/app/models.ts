export interface IJob {
    _id?: string;
    title: string;
    org: string;
    period: string;
    bullets: string[];
}

export interface IProject {
    _id?: string;
    featured?: boolean;
    badge?: string;
    title: string;
    subtitle?: string;
    description: string;
    bullets?: string[];
    tags: string[];
}

export interface ISkillGroup {
    _id?: string;
    title: string;
    skills: string[];
}

export interface IProfile {
    aboutParagraphs: string[];
    educationSchool: string;
    educationLines: string[];
    languages: string[];
    contactLead: string;
    email: string;
    phone: string;
    linkedin: string;
    linkedinLabel: string;
    github: string;
}