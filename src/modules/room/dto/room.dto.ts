import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, Min, IsBoolean } from "class-validator";
export class RoomDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    tenPhong: string;
    
    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, example: 0 })
    khach: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, example: 0 })
    phongNgu: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, example: 0 })
    giuong: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, example: 0 })
    phongTam: number;

    @IsString()
    @ApiProperty({ type: String, example: "string" , required: false})
    moTa: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({ type: Number, example: 0 })
    giaTien: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number, example: 0 })
    maViTri: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    mayGiat: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    banLa: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    tivi: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    dieuHoa: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    wifi: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    bep: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    doXe: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    hoBoi: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, example: true })
    banUi: boolean;
}