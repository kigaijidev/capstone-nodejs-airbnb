import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateLocationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    tenViTri: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    tinhThanh: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    quocGia: string;

    @IsString()
    @ApiProperty({ type: String, example: "string" })
    hinhAnh: string;
}