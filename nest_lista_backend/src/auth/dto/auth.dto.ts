import { IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    nome: string;
    
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    senha: string;
}

export class SignInDto { 
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    senha: string;
}

export class EventDto { 
    @IsNotEmpty()
    nome:string;
    @IsNotEmpty()
    id:number
}

export class DadosDto { 
    @IsNotEmpty()
    dados:number;
}

export class MediaDto { 
    @IsNotEmpty()
    mediaNome:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    directoryPath:string;

    @IsNotEmpty()
    id:number;
}

export class DeleteDto {
    @IsNotEmpty()
    id:number
    classe:string
}