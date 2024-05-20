import { Test, TestingModule } from '@nestjs/testing';
import { BillLogService } from './bill_log.service';

describe('BillLogService', () => {
  let service: BillLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillLogService],
    }).compile();

    service = module.get<BillLogService>(BillLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
