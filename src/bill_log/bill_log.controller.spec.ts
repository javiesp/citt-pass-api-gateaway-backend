import { Test, TestingModule } from '@nestjs/testing';
import { BillLogController } from './bill_log.controller';
import { BillLogService } from './bill_log.service';

describe('BillLogController', () => {
  let controller: BillLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillLogController],
      providers: [BillLogService],
    }).compile();

    controller = module.get<BillLogController>(BillLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
