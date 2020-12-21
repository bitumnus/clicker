import { Body, Controller, Get, Header, Post, Request } from "@nestjs/common";
import { ClickService } from "./click.service";
import { ClickDto } from "./dto/click.dto";

@Controller('api/v3/click')
export class ClickController {
    constructor(private readonly clickService: ClickService) {}
    
    @Post("")
    async setClick(@Body() payload: ClickDto): Promise<any> {
        return this.clickService.setClick(payload);
    }

}