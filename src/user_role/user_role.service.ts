import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from './entities/user_role.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserRoleService {

  constructor(@InjectModel(UserRole.name) private readonly userRoleModel: Model<UserRole>) {}


  async createUserRole(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const createdUserRole = new this.userRoleModel(createUserRoleDto).save();
    console.log(createUserRoleDto)
    return createdUserRole;
  }

  async findAllUserRoles() : Promise<UserRole[]>{
    return await this.userRoleModel.find().exec();
  }

  async findOneUserRole(id: string): Promise<UserRole> {
    return await this.userRoleModel.findById(id).exec();
  }

  async findOneUserRoleByUID(uid_user: string): Promise<UserRole> {
    return await this.userRoleModel.findOne({ uid_user }).exec();
  }

  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    return await this.userRoleModel.findByIdAndUpdate(id, updateUserRoleDto, { new: true }).exec();
  }


  async removeUserRole(id: string): Promise<UserRole> {
    return await this.userRoleModel.findByIdAndDelete(id).exec();
  }


}