import { Injectable } from '@nestjs/common';
import { RedisService } from '~/redis/redis.service';
// import { CreateFighterDto } from './dto/create-fighter.dto';
// import { UpdateFighterDto } from './dto/update-fighter.dto';

@Injectable()
export class FightersService {
  constructor(private readonly redisService: RedisService) {}

  // create(createFighterDto: CreateFighterDto) {
  //   return 'This action adds a new fighter';
  // }

  findAll() {
    // return `This action returns all fighters`;
    return this.redisService.getFighters();
  }

  findOne(id: number) {
    return `This action returns a #${id} fighter`;
  }

  // update(id: number, updateFighterDto: UpdateFighterDto) {
  //   return `This action updates a #${id} fighter`;
  // }

  remove(id: number) {
    return `This action removes a #${id} fighter`;
  }
}
