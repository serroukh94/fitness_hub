import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CheckIn } from './schemas/check-in.schema';

export class CreateCheckInDto {
  weight: number;
  notes?: string;
}

@Injectable()
export class CoachingService {
  constructor(@InjectModel(CheckIn.name) private checkInModel: Model<CheckIn>) {}

  async create(userId: string, createCheckInDto: CreateCheckInDto): Promise<CheckIn> {
    const checkIn = new this.checkInModel({
      userId: new Types.ObjectId(userId),
      ...createCheckInDto,
    });
    return checkIn.save();
  }

  async findAllByUser(userId: string): Promise<CheckIn[]> {
    return this.checkInModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ date: -1 })
      .exec();
  }

  async findOneByUser(userId: string, checkInId: string): Promise<CheckIn> {
    const checkIn = await this.checkInModel.findOne({
      _id: new Types.ObjectId(checkInId),
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!checkIn) {
      throw new NotFoundException('Check-in not found');
    }
    return checkIn;
  }
}
