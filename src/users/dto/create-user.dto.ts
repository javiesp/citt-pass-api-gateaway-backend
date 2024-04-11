export class CreateUserDto {
    uid_user: string;
    email: string;
    phone: number;
    name: string;
    hashed_password: string
    proyect_id_mongo: string;
}