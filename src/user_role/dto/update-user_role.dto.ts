import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoleDto } from './create-user_role.dto';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {
    role_id: number;
    uid_user: string;
    user_role: string[];
    user_major: string;
    user_permissions: string[];
    major_school: string;
    current_semester: number;
}
