import { VerifyTokenDto } from "./dto";
import { tokenService } from "./token.service";
import { Response } from "express";
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: tokenService);
    verify(response: Response, verifyTokoenDto: VerifyTokenDto): Promise<Response>;
}
