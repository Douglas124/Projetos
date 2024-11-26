import { IsNotEmpty } from "class-validator";

export class VerifyTokenDto {
    @IsNotEmpty()
    authorization:string;

    [props:string]: any
}