import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}


  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto).save();
    console.log(createRoleDto)
    return createdRole;
  }

  async findAllRoles() : Promise<Role[]>{
    return await this.roleModel.find().exec();
  }

  async findOneRole(id: string): Promise<Role> {
    return await this.roleModel.findById(id).exec();
  }

  async findOneRoleId(role_id: string): Promise<Role> {
    return await this.roleModel.findOne({ role_id }).exec();
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
  }


  async removeRole(id: string): Promise<Role> {
    return await this.roleModel.findByIdAndDelete(id).exec();
  }
}