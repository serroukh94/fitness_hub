import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Entitlement extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
  
  @Prop({ required: true })
  grantedAt: Date;
}

export const EntitlementSchema = SchemaFactory.createForClass(Entitlement);

// Index composé pour s'assurer qu'un utilisateur n'a pas plusieurs fois le même droit actif
EntitlementSchema.index({ userId: 1, productId: 1 }, { unique: true });
