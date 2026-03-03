import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CoachingService, CreateCheckInDto } from './coaching.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCheckInValidationDto implements CreateCheckInDto {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

@UseGuards(JwtAuthGuard)
@Controller('coaching/check-ins')
export class CoachingController {
  constructor(private readonly coachingService: CoachingService) {}

  @Post()
  create(@Request() req: { user: { userId: string } }, @Body() createCheckInDto: CreateCheckInValidationDto) {
    return this.coachingService.create(req.user.userId, createCheckInDto);
  }

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.coachingService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: { user: { userId: string } }, @Param('id') id: string) {
    return this.coachingService.findOneByUser(req.user.userId, id);
  }
}
