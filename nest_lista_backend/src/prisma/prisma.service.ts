import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private ConfigService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: ConfigService.get("DATABASE_URL")
                }
            }
        })
    }
}