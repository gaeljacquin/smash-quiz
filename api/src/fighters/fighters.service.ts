import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { Fighter, FighterDocument } from 'src/schemas/fighter.schema';

@Injectable()
export class FightersService {
  constructor(
    @InjectModel(Fighter.name) private fighterModel: Model<FighterDocument>
  ) {}

  create(createFighterDto: CreateFighterDto) {
    return 'This action adds a new fighter';
  }

  async findAll() {
    return this.fighterModel.find({}, {_id: 0});
  }

  findOne(id: number) {
    return `This action returns a #${id} fighter`;
  }

  update(id: number, updateFighterDto: UpdateFighterDto) {
    return `This action updates a #${id} fighter`;
  }

  remove(id: number) {
    return `This action removes a #${id} fighter`;
  }
}
