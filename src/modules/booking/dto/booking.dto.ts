import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class BookingDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number, example: "number" })
    maPhong: number;
    
    @IsDateString()
    @ApiProperty({ type: Date, example: "2023-08-05" })
    ngayDen: Date;
    
    @IsDateString()
    @ApiProperty({ type: Date, example: "2023-08-25" })
    ngayDi: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({ type: Number, example: "number" })
    soLuongKhach: number;
}