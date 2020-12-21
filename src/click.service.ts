// import * as dayjs from 'dayjs'
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Click } from "src/models/click.model";
import { Model } from "mongoose";
import { ClickDto } from "./dto/click.dto";

@Injectable()
export class ClickService {
    constructor(
        @InjectModel(Click.name) private clickModel: Model<Click>
    ) {}

    // async findAllClicks(): Promise<ClickPage> {
    //     const {findClicksByOwner: response} = await this.clickModel.find().then(result => {
    //         return result;
    //     })
    
    //     return response
    // }

    async setClick(payload: ClickDto): Promise<Click> {
        const create = new this.clickModel(payload);
        const created = await create.save();
        console.log(created);

        return created;
    }
}