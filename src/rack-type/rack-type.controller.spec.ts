import { Test, TestingModule } from '@nestjs/testing';
import { RackTypeController } from './rack-type.controller';
import { RackTypeService } from './rack-type.service';

describe('RackTypeController', () => {
  let controller: RackTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RackTypeController],
      providers: [RackTypeService],
    }).compile();

    controller = module.get<RackTypeController>(RackTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
