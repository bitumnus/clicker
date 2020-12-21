import {Column, Model, Table} from 'sequelize-typescript';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClickDocument = Click & Document;
@Schema()
// @Table({tableName: 'click'})
export class Click extends Document  {
    @Prop({field: 'external_id'})
    externalID: number;

    @Prop({field: 'target'})
    target: string;

    @Prop({field: 'created_at'})
    createdAt: Date;

    @Prop({field: 'updated_at'})
    updatedAt: Date;
}
export const ClickSchema = SchemaFactory.createForClass(Click);