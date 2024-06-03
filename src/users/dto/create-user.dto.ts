export class CreateUserDto {
    uid_user: string;
    email: string;
    phone: number;
    name: string;
    hashed_password: string
    run: string
    project_id: number;
}

export class LoginAuthDto {
    email: string;
    hashed_password: string
}
