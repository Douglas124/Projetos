import { PrismaService } from "src/prisma/prisma.service";
import { IDelete, IEvent, IMedia, ISignIn, ISignUp } from "./interface";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt/dist";
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    private generateToken;
    signUp(nome: string, email: string, senha: string): Promise<ISignUp>;
    signIn(email: string, senha: string): Promise<ISignIn>;
    Event(nome: string, id: number): Promise<IEvent>;
    Media(nome: string, description: string, directory: string, id: number): Promise<IMedia>;
    Dados(id: number): Promise<any>;
    Delete(id: number, classe: string): Promise<IDelete>;
}
