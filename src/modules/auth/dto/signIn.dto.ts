import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class signInDto {
    @IsEmail()
    @MinLength(4)
    @ApiProperty({ type: String, example: "string" })
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ type: String, example: "string" })
    password: string;
}