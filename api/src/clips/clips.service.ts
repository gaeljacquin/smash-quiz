import { Injectable } from '@nestjs/common';
import { RedisService } from '~/redis/redis.service';
// import { CreateClipDto } from './dto/create-clip.dto';
// import { UpdateClipDto } from './dto/update-clip.dto';

@Injectable()
export class ClipsService {
  constructor(private readonly redisService: RedisService) {}

  // create(createClipDto: CreateClipDto) {
  //   return 'This action adds a new clip';
  // }

  findAll() {
    return `This action returns all clips`;
  }

  findAllCustom() {
    return this.redisService.getClips();
  }

  findOne(id: number) {
    return `This action returns a #${id} clip`;
  }

  // update(id: number, updateClipDto: UpdateClipDto) {
  //   return `This action updates a #${id} clip`;
  // }

  remove(id: number) {
    return `This action removes a #${id} clip`;
  }
}
