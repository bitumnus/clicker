import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class ClickDto {
    @IsNotEmpty()
    @IsNumber()
    externalID: number;

    @IsNotEmpty()
    target: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
