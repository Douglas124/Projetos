import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ITokenVerify } from "./interface";
export declare class tokenService {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    verify(token: string): Promise<ITokenVerify>;
}
