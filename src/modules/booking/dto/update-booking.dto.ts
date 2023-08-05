import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateBookingDto {
    @IsDateString()
    @ApiProperty({ type: Date, example: "2023-08-05T13:28:49.062Z" })
    ngayDen: Date;
    
    @IsDateString()
    @ApiProperty({ type: Date, example: "2023-08-05T13:28:49.062Z" })
    ngayDi: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({ type: Number, example: "number" })
    soLuongKhach: number;
}