import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ProductType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  PROGRAM = 'PROGRAM',
  EQUIPMENT = 'EQUIPMENT',
}

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    type: String,
    enum: Object.values(ProductType),
    required: true,
  })
  productType: ProductType;

  @Prop({ required: false })
  coverUrl?: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
