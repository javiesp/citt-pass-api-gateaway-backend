import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, projectDocument } from './entities/project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {}


  createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdUser = new this.projectModel(createProjectDto).save();
    console.log(createProjectDto)
    return createdUser;
  } 

  findAll() {
    return `This action returns all project`;
  }

  async findAllProject(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findProjectById(project_id: any) {
    return await this.projectModel.find({"project_id": project_id}).exec();
  }

  async searchProductByName(project_name: any) {
    return await this.projectModel.find({"project_name": project_name}).exec();
  }

  async updateProject(id: any, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto)
  }

  async removeProject(id: any) {
    console.log(id)
    return await this.projectModel.findByIdAndDelete(id)
  }
}