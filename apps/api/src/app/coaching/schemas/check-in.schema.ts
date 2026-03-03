import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CheckIn extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  weight: number;

  @Prop({ required: false })
  notes?: string;

  @Prop({ required: true, default: Date.now })
  date: Date;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
