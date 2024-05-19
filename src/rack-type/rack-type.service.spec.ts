import { Test, TestingModule } from '@nestjs/testing';
import { RackTypeService } from './rack-type.service';

describe('RackTypeService', () => {
  let service: RackTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RackTypeService],
    }).compile();

    service = module.get<RackTypeService>(RackTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
