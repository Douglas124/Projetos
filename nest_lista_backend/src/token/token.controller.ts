import { Controller,Get, Headers, Res } from "@nestjs/common";
import { VerifyTokenDto } from "./dto";
import { tokenService } from "./token.service";
import { Response } from "express";

@Controller("token")
export class TokenController {
    constructor(private readonly tokenService: tokenService) {}

    @Get("verify")
    async verify(@Res() response:Response,@Headers() verifyTokoenDto: VerifyTokenDto):Promise<Response> {
        const {authorization} = verifyTokoenDto;

        if (authorization) {
            const token: string= authorization.replace("Bearer ", "");
            
            const {flag,message, tokenInfo} = await this.tokenService.verify(token);
            
            if (flag) {
                return response.status(200).json({
                    message,
                    tokenInfo
                });
                
            }

            return response.status(401).json({
                message,
                tokenInfo
            })

        }

        return response.status(401).json({
            message:"Token faltante"
        })
    }
}