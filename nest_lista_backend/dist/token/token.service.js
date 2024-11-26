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
exports.tokenService = void 0;
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let tokenService = class tokenService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async verify(token) {
        const tokenOptions = {
            secret: this.configService.get("JWT_SECRET"),
            algorithms: "HS256"
        };
        try {
            const tokenData = await this.jwtService.verifyAsync(token, tokenOptions);
            return {
                flag: true,
                message: "Token válido.",
                tokenInfo: Object.assign({}, tokenData)
            };
        }
        catch (error) {
            return {
                flag: false,
                message: "Token inválido."
            };
        }
        ;
    }
    ;
};
tokenService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], tokenService);
exports.tokenService = tokenService;
//# sourceMappingURL=token.service.js.map