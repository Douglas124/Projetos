import { Response } from "express";
import { AuthService } from "./auth.service";
import { DadosDto, DeleteDto, EventDto, MediaDto, SignUpDto } from "./dto";
import { SignInDto } from "./dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(response: Response, SignUpDto: SignUpDto): Promise<Response>;
    signIn(response: Response, SignInDto: SignInDto): Promise<Response>;
    regisEvent(response: Response, EventDto: EventDto): Promise<Response>;
    regisMedia(response: Response, MediaDto: MediaDto): Promise<Response>;
    dados(response: Response, DadosDto: DadosDto): Promise<Response>;
    delete(response: Response, DeleteDto: DeleteDto): Promise<Response>;
}
