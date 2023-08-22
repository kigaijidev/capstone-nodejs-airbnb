import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

    @IsBoolean()
    @ApiProperty({ type: Boolean, example: false })
    trangThai: boolean;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    tenLoai: string;

}