import { ConfigService } from "@nestjs/config/dist";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient {
    private ConfigService;
    constructor(ConfigService: ConfigService);
}
