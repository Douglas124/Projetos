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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const dto_2 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(response, SignUpDto) {
        const { nome, email, senha } = SignUpDto;
        const { flag, message } = await this.authService.signUp(nome, email, senha);
        if (flag) {
            return response.status(201).json({
                message: "Usuário cadastrado com sucesso"
            });
        }
        return response.status(401).json({
            message
        });
    }
    async signIn(response, SignInDto) {
        const { email, senha } = SignInDto;
        const { flag, message, token, user } = await this.authService.signIn(email, senha);
        if (flag) {
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
    async regisEvent(response, EventDto) {
        const { nome, id } = EventDto;
        const { flag, idd, message } = await this.authService.Event(nome, id);
        if (flag) {
            return response.status(201).json({
                message,
                idd
            });
        }
        return response.status(401).json({
            message: "Não foi possivel cadastrar o evento."
        });
    }
    async regisMedia(response, MediaDto) {
        const { mediaNome, description, directoryPath, id } = MediaDto;
        const { flag, message } = await this.authService.Media(mediaNome, description, directoryPath, id);
        if (flag) {
            return response.status(201).json({
                message
            });
        }
        return response.status(401).json({
            message
        });
    }
    async dados(response, DadosDto) {
        const { dados } = DadosDto;
        const { events, media } = await this.authService.Dados(dados);
        return response.status(201).json({
            events,
            media,
        });
    }
    async delete(response, DeleteDto) {
        const { id, classe } = DeleteDto;
        const { message, flag } = await this.authService.Delete(id, classe);
        return response.status(201).json({
            message
        });
    }
};
__decorate([
    (0, common_1.Post)("signUp"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("signIn"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("event"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.EventDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "regisEvent", null);
__decorate([
    (0, common_1.Post)("media"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.MediaDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "regisMedia", null);
__decorate([
    (0, common_1.Post)("dados"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DadosDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "dados", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.contoller.js.map