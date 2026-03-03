import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CoachingModule } from './coaching/coaching.module';

@Module({
  imports: [
    // Configuration stricte des variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api/.env',
    }),

    // Connexion asynchrone à MongoDB garantissant l'accès sécurisé aux variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');

        if (!mongoUri) {
          throw new Error('CONFIG ERROR: MONGO_URI is not defined in the environment variables.');
        }

        return {
          uri: mongoUri,
          // Optimisations pour de meilleures performances et stabilité sous NestJS/Mongoose
          autoIndex: true, // Désactiver en production une fois les index créés par scalabilité
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CheckoutModule,
    CoachingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
