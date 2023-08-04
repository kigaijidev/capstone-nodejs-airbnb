import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsEnum, IsEmail, IsNotEmpty, IsDateString, IsNumber } from "class-validator";
import { GenderEnum } from "src/enums/gender.enum";
import { RoleEnum } from "src/enums/role.enum";

export class AuthUser {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(10)
    phone: string;

    @IsDateString()
    birthday: Date;

    @IsEnum(GenderEnum)
    gender: string;

    @IsEnum(RoleEnum)
    role: string;
}