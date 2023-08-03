import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsEnum, IsNotEmpty, IsDateString } from "class-validator";
import { GenderEnum } from "src/enums/gender.enum";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    name: string;
    
    @IsString()
    @MinLength(10)
    @ApiProperty({ type: String, example: "string" })
    phone: string;

    @IsDateString()
    @ApiProperty({ type: Date, example: "string" })
    birthday: Date;

    @IsEnum(GenderEnum)
    @ApiProperty({ type: GenderEnum, example: "string", enum: GenderEnum, enumName: GenderEnum.OTHER })
    gender: string;
}