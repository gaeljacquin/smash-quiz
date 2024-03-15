import { Test, TestingModule } from '@nestjs/testing';
import { FighterController } from '~/src/fighter/fighter.controller';

describe('FighterController', () => {
  let controller: FighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FighterController],
    }).compile();

    controller = module.get<FighterController>(FighterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
