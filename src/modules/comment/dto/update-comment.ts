import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "string" })
    noiDung: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @ApiProperty({ type: Number, example: "number" })
    saoBinhLuan: number;
}