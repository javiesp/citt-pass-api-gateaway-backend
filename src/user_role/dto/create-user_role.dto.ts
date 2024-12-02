export class CreateUserRoleDto {
    user_role_id: number;
    role_id: number;
    uid_user: string;
    user_role: string[];
    user_major: string;
    user_permissions: string[];
    major_school: string;
    current_semester: number;
}