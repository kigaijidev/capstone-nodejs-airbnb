import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PageDto{
    @IsNotEmpty()
    @ApiProperty({ type: Number , description: "pageIndex"})
    pageIndex: number

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: "pageSize"})
    pageSize: number

    @IsOptional()
    @ApiProperty({ type: String, description: "keyword", required: false })
    keyword: string
}