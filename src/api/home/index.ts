import { api } from "@/api/api";

export type HomeProjectResponse = {
    SariinNer: string;
    TusulToo: number;
};

export type HomeStatusResponse = {
    ner: string;
    tusul_tuluv_too: number;
    tusul_tuluv_huvi: number;
};