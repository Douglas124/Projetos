"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const argon2 = require("argon2");
const config_1 = require("@nestjs/config");
const dist_1 = require("@nestjs/jwt/dist");
let AuthService = class AuthService {
    constructor(prismaService, configService, jwtService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async generateToken(usuario) {
        const jwtPayload = {
            sub: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };
        const jwtOptions = {
            expiresIn: "2d",
            secret: this.configService.get("JWT_SECRET")
        };
        const token = await this.jwtService.signAsync(jwtPayload, jwtOptions);
        return token;
    }
    async signUp(nome, email, senha) {
        const senhaHash = await argon2.hash(senha);
        try {
            await this.prismaService.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash
                }
            });
            return {
                flag: true,
                message: "Usuário cadastrado com sucesso."
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe um usuário com esse email,por favor forneça um email diferente."
                    };
                }
            }
        }
    }
    async signIn(email, senha) {
        const usuario = await this.prismaService.usuario.findFirst({
            where: {
                email: {
                    equals: email
                }
            }
        });
        if (usuario) {
            const senhaHash = usuario.senha;
            const verificarSenha = await argon2.verify(senhaHash, senha);
            delete usuario.senha;
            if (verificarSenha) {
                const token = await this.generateToken(usuario);
                return {
                    flag: true,
                    message: "Usuario encontrado",
                    token: token,
                    user: usuario
                };
            }
        }
        return {
            flag: false,
            message: "Email ou senha inválidos",
            user: usuario
        };
    }
    async Event(nome, id) {
        try {
            const user = await this.prismaService.usuario.findFirst({
                where: {
                    id: {
                        equals: id
                    }
                }
            });
            await this.prismaService.evento.create({
                data: {
                    nome: nome,
                    user: {
                        connect: {
                            id: user.id,
                        }
                    }
                }
            });
            return {
                flag: true,
                idd: id,
                message: "Evento Criado"
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe um evento com esse nome"
                    };
                }
            }
        }
    }
    async Media(nome, description, directory, id) {
        try {
            const evento = await this.prismaService.evento.findFirst({
                where: {
                    id: {
                        equals: id
                    }
                }
            });
            const media = await this.prismaService.media.create({
                data: {
                    nome: nome,
                    description: description,
                    directoryPath: directory,
                    event: {
                        connect: {
                            id: evento.id,
                        }
                    }
                }
            });
            return {
                flag: true,
                message: "Media Criada"
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe uma midia com esse nome"
                    };
                }
            }
        }
    }
    async Dados(id) {
        const infoEvents = await this.prismaService.evento.findMany({
            where: {
                userId: {
                    equals: id
                }
            }
        });
        const infoMedia = await this.prismaService.media.findMany({});
        return {
            events: infoEvents,
            media: infoMedia
        };
    }
    async Delete(id, classe) {
        if (classe == "evento") {
            await this.prismaService.media.deleteMany({
                where: {
                    eventId: id
                }
            });
            await this.prismaService.evento.delete({
                where: {
                    id: id
                }
            });
        }
        else {
            await this.prismaService.media.delete({
                where: {
                    id: id
                }
            });
        }
        return {
            message: `${classe} deletado/a com sucesso`,
            flag: true
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService, dist_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map