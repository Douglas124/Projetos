import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";
import { Global } from "@nestjs/common";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
