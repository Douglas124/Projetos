import { Controller, Post, Body, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import {AuthService} from "./auth.service";
import { DadosDto, DeleteDto, EventDto, MediaDto, SignUpDto } from "./dto";
import { SignInDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signUp")
    async signUp(@Res() response: Response, @Body() SignUpDto: SignUpDto): Promise<Response> {
        const {nome, email, senha} = SignUpDto;
        
        const {flag, message} = await this.authService.signUp(nome, email, senha);

        if (flag) {
            return response.status(201).json({
                message: "Usuário cadastrado com sucesso"
            });
        }

        return response.status(401).json({
            message
        });
    }


    @Post("signIn")
    async signIn(@Res() response: Response, @Body() SignInDto: SignInDto): Promise<Response> {
        const {email, senha} = SignInDto;

        const {flag, message, token,user} = await this.authService.signIn(email,senha);
    
            if(flag) {
                return response.status(200).json({
                    message: "Usuário encontrado.Senha Correta.Fazendo Login.",
                    token,
                    user
                });
            }
        return response.status(401).json({
            message
        });
    }


    @Post("event")
    async regisEvent(@Res() response: Response, @Body() EventDto:EventDto): Promise<Response> {
        const {nome,id} = EventDto
        const {flag,idd,message} = await this.authService.Event(nome,id)

        if (flag){
            return response.status(201).json({
                message,
                idd
            })
        }

        return response.status(401).json({
            message: "Não foi possivel cadastrar o evento."
        })
    }


    @Post("media")
    async regisMedia(@Res() response: Response, @Body() MediaDto:MediaDto):Promise<Response> {
        const {mediaNome, description, directoryPath,id} = MediaDto
        
        const {flag, message} = await this.authService.Media(mediaNome, description, directoryPath,id);

        if (flag){
            return response.status(201).json({
                message
            })
        }

        return response.status(401).json({
            message
        })
    }


    @Post("dados")
    async dados(@Res() response: Response, @Body() DadosDto:DadosDto): Promise<Response> {

        const {dados} = DadosDto;

        const {events,media} = await this.authService.Dados(dados)

        return response.status(201).json({
                events,
                media,
                
        })
    }

    @Post("delete")
    async delete(@Res() response:Response, @Body() DeleteDto:DeleteDto): Promise<Response> {
        const {id,classe} = DeleteDto;

        const {message,flag} = await this.authService.Delete(id,classe)

        return response.status(201).json({
            message
        })
    }
}