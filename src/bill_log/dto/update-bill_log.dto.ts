import { PartialType } from '@nestjs/mapped-types';
import { CreateBillLogDto } from './create-bill_log.dto';

export class UpdateBillLogDto extends PartialType(CreateBillLogDto) {
    proyect_id: number;
    uid_user: string;
    item: string[];
    total_amount: number;
    d_number: number;
    log_date: Date;
}
