import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachingService } from './coaching.service';
import { CoachingController } from './coaching.controller';
import { CheckIn, CheckInSchema } from './schemas/check-in.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }])],
  controllers: [CoachingController],
  providers: [CoachingService],
})
export class CoachingModule {}
