import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsEnum, IsEmail, IsNotEmpty, IsDateString } from "class-validator";
import { GenderEnum } from "src/enums/gender.enum";
import { RoleEnum } from "src/enums/role.enum";

export class signUpDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    email: string;
    
    @IsString()
    @MinLength(8)
    @ApiProperty({ type: String, example: "string" })
    password: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({ type: String, example: "string" })
    phone: string;

    @IsDateString()
    @ApiProperty({ type: Date, example: "string" })
    birthday: Date;

    @IsEnum(GenderEnum)
    @ApiProperty({ type: GenderEnum, example: "string", enum: GenderEnum, enumName: 'Gender' })
    gender: string;

    @IsEnum(RoleEnum)
    @ApiProperty({ type: RoleEnum, example: "string", enum: RoleEnum, enumName: 'Role' })
    role: string;
}