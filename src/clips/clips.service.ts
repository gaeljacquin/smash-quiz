import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { Clip, ClipDocument } from 'src/schemas/clip.schema';

@Injectable()
export class ClipsService {
  constructor(
    @InjectModel(Clip.name) private clipModel: Model<ClipDocument>
  ) {}

  create(createClipDto: CreateClipDto) {
    return 'This action adds a new clip';
  }

  findAll() {
    return `This action returns all clips`;
  }

  async findRandom() {
    const count = await this.clipModel.count()
    const random = Math.floor(Math.random() * count)
    const clip = await this.clipModel
      .findOne({}, {
        _id: 0,
        name: 0,
      })
      .skip(random)

    return clip
  }

  findOne(id: number) {
    return `This action returns a #${id} clip`;
  }

  update(id: number, updateClipDto: UpdateClipDto) {
    return `This action updates a #${id} clip`;
  }

  remove(id: number) {
    return `This action removes a #${id} clip`;
  }
}
