import { Evento, Usuario } from "@prisma/client";
export interface ISignUp {
    flag: boolean;
    message: string;
}
export interface ISignIn {
    flag: boolean;
    message: string;
    token?: string;
    user: Usuario;
}
export interface IJwtPayload {
    sub: number;
    nome: string;
    email: string;
}
export interface IJwtOptions {
    expiresIn: string;
    secret: string;
}
export interface IEvent {
    idd?: number;
    flag?: boolean;
    message?: string;
}
export interface IDados {
    events: Usuario;
    media: Evento;
}
export interface IMedia {
    flag?: boolean;
    message?: string;
}
export interface IDelete {
    message: string;
    flag: boolean;
}
