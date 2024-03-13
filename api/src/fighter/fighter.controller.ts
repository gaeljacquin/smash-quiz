import { Controller, Get } from '@nestjs/common';
import { FighterService } from '~/src/fighter/fighter.service';

@Controller('fighters')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @Get()
  findAll() {
    return this.fighterService.findAll();
  }
}
