export class CreateBillLogDto {
    proyect_id: number;
    uid_user: string;
    item: string[];
    total_amount: number;
    d_number: number;
    log_date: Date;
}
