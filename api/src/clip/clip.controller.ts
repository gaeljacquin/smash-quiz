import { Body, Controller, Get } from '@nestjs/common';
import { ClipService } from '~/src/clip/clip.service';

@Controller('clip')
export class ClipController {
  constructor(private readonly clipService: ClipService) {}

  @Get('/random')
  findOne(@Body('exclude') excludeClipId?: number) {
    return this.clipService.findRandom(excludeClipId);
  }
}
