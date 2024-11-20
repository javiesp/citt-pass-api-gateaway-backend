import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginAuthDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async userLogin(loginAuthDto: LoginAuthDto) {
    console.log('HOLA MUNDO')
    console.log(loginAuthDto)
    const emailUser = loginAuthDto.email;
    const passUser = loginAuthDto.hashed_password;

    const findUser = await this.userModel.findOne({ email: emailUser });

    if (!findUser) {
      console.log('Usuario no encontrado');
      throw new HttpException('USUARIO_NO_ENCONTRADO', 404);
    }

    if (findUser.hashed_password !== passUser) {
      throw new HttpException('CONTRASEÑA_INCORRECTA', 403);
    } 
    return true;
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto).save();
    console.log(createUserDto)
    return createdUser;
  }

  async findUsersByProject(proyectId: number): Promise<User[]> {
    return this.userModel.find({ proyect_id: proyectId }).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async updateUserPassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserPasswordDto, { new: true }).exec();
  }

  async removeUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
