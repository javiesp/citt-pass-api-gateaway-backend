import { Test, TestingModule } from '@nestjs/testing';
import { DecreaseController } from './decrease.controller';
import { DecreaseService } from './decrease.service';

describe('DecreaseController', () => {
  let controller: DecreaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecreaseController],
      providers: [DecreaseService],
    }).compile();

    controller = module.get<DecreaseController>(DecreaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
