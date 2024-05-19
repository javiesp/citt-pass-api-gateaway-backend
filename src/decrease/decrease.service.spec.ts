import { Test, TestingModule } from '@nestjs/testing';
import { DecreaseService } from './decrease.service';

describe('DecreaseService', () => {
  let service: DecreaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecreaseService],
    }).compile();

    service = module.get<DecreaseService>(DecreaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
