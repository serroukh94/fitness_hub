import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Entitlement } from './schemas/entitlement.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Entitlement.name) private entitlementModel: Model<Entitlement>,
    private readonly productsService: ProductsService,
  ) {}

  async simulateCheckout(userId: string, productId: string) {
    // 1. Vérifier que le produit existe et est actif
    const product = await this.productsService.findOne(productId);
    
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found or inactive');
    }

    // 2. Vérifier si l'utilisateur possède déjà ce produit
    const existingEntitlement = await this.entitlementModel.findOne({
      userId: new Types.ObjectId(userId),
      productId: new Types.ObjectId(productId),
    });

    if (existingEntitlement) {
      throw new ConflictException('User already owns this product');
    }

    // 3. Simuler le paiement "réussi" et créer le droit d'accès
    const entitlement = new this.entitlementModel({
      userId: new Types.ObjectId(userId),
      productId: new Types.ObjectId(productId),
      grantedAt: new Date(),
    });

    await entitlement.save();

    return {
      success: true,
      message: 'Payment simulated successfully. Entitlement granted.',
      entitlement,
    };
  }
}
