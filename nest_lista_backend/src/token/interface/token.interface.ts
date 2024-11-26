interface TokenInfo{
    sub:number;
    nome: string;
    email: string;
    Iat: number;
    exp: number;
}

export interface ITokenVerify {
    flag: boolean;
    message: string;
    tokenInfo?: TokenInfo;
}