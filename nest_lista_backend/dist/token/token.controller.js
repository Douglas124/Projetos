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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const token_service_1 = require("./token.service");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async verify(response, verifyTokoenDto) {
        const { authorization } = verifyTokoenDto;
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            const { flag, message, tokenInfo } = await this.tokenService.verify(token);
            if (flag) {
                return response.status(200).json({
                    message,
                    tokenInfo
                });
            }
            return response.status(401).json({
                message,
                tokenInfo
            });
        }
        return response.status(401).json({
            message: "Token faltante"
        });
    }
};
__decorate([
    (0, common_1.Get)("verify"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.VerifyTokenDto]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "verify", null);
TokenController = __decorate([
    (0, common_1.Controller)("token"),
    __metadata("design:paramtypes", [token_service_1.tokenService])
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map