import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TokenController } from "./token.controller";
import { tokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt"

@Module({
    imports: [JwtModule,ConfigModule],
    controllers: [TokenController],
    providers:[tokenService]
})
export class TokenModule {}