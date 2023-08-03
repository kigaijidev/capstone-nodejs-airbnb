import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UploadCustomDto{
    @IsNumber()
    @ApiProperty({type: Number})
    id: number

    @ApiProperty({type: 'string', format: 'binary'})
    file: Express.Multer.File
}