import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IDelete, IEvent, IJwtOptions, IJwtPayload, IMedia, ISignIn, ISignUp } from "./interface";
import { Prisma, Usuario } from "@prisma/client"
import * as argon2 from "argon2";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt/dist";
import { skip } from "rxjs";




@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly configService:ConfigService, private readonly jwtService:JwtService) { }

    private async generateToken(usuario:Usuario) {
        const jwtPayload:IJwtPayload ={
            sub:usuario.id,
            nome:usuario.nome,
            email:usuario.email
        }

        const jwtOptions:IJwtOptions = {
            expiresIn: "2d",
            secret: this.configService.get("JWT_SECRET")
        }

        const token:string = await this.jwtService.signAsync(jwtPayload,jwtOptions)

        return token
    }

    async signUp(nome: string, email: string, senha: string): Promise<ISignUp> {
        const senhaHash:string = await argon2.hash(senha)

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
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe um usuário com esse email,por favor forneça um email diferente."
                    }
                }
            }
        }
    }


    async signIn(email: string, senha:string): Promise<ISignIn> {
        const usuario = await this.prismaService.usuario.findFirst({
            where: {
                    email:{
                        equals:email
                    }        
                }
            }
        );
        if(usuario) {
            const senhaHash: string = usuario.senha;

            const verificarSenha: boolean = await argon2.verify(senhaHash, senha);
            delete usuario.senha
            if (verificarSenha) {
                const token:string = await this.generateToken(usuario);

                return {
                    flag: true,
                    message: "Usuario encontrado",
                    token:token,
                    user: usuario
                }
            }
        }

        return {
            flag:false,
            message: "Email ou senha inválidos",
            user: usuario
        }


    }

    async Event(nome:string, id:number): Promise<IEvent> {
        try {
            const user = await this.prismaService.usuario.findFirst({
                    where:{
                        id:{
                            equals:id
                        }
                    }
            })
            await this.prismaService.evento.create({
                data:{
                    nome:nome,
                    user:{
                        connect:{
                            id:user.id,
                        }
                    }
                }
            });
    
    
            return {
                flag: true,
                idd:id,
                message: "Evento Criado"
            }

        }catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe um evento com esse nome"
                    }
                }
            }
        }
    }
    
    
    
    
    async Media(nome:string, description:string, directory:string,id:number): Promise<IMedia> {
       try {
            const evento = await this.prismaService.evento.findFirst({
                where:{
                    id:{
                        equals:id
                    }
                }
        })
            const media = await this.prismaService.media.create({
                data:{
                    nome:nome,
                    description: description,
                    directoryPath:directory,
                    event:{
                        connect:{
                            id:evento.id,
                        }
                    }
                }
            });
    
    
            return {
                flag: true,
                message: "Media Criada"
            }

        }catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        flag: false,
                        message: "Já existe uma midia com esse nome"
                    }
                }
            }
        }
    }



    async Dados(id:number): Promise<any> {
    
            const infoEvents = await this.prismaService.evento.findMany({
                where:{
                    userId:{
                        equals:id
                    }
                }
            });
            const infoMedia = await this.prismaService.media.findMany({});

    
            return {
                events:infoEvents,
                media:infoMedia
            }
    }


    async Delete(id:number,classe:string): Promise<IDelete> {
        if(classe == "evento"){
            await this.prismaService.media.deleteMany({
                where:{
                    eventId:id
                }
            });

            await this.prismaService.evento.delete({
                where:{
                    id:id
                }
            })
        }else{
            await this.prismaService.media.delete({
                where:{
                    id:id
                }
            })
        }

        return {
            message:`${classe} deletado/a com sucesso`,
            flag:true
        }
    }
}