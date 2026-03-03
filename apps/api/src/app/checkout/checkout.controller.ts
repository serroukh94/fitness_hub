import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class SimulateCheckoutDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'productId must be a valid MongoDB ObjectId' })
  productId: string;
}

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post('simulate')
  @HttpCode(HttpStatus.OK)
  async simulate(@Request() req: { user: { userId: string } }, @Body() body: SimulateCheckoutDto) {
    // req.user.userId provient du token décodé par la JwtStrategy
    return this.checkoutService.simulateCheckout(req.user.userId, body.productId);
  }
}
