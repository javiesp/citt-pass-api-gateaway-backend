import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './entities/item.entity';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto).save();
    console.log(createItemDto)
    return createdItem;
  }

  async findAllItems() : Promise<Item[]>{
    return await this.itemModel.find().exec();
  }

  async findOneItem(id: string): Promise<Item> {
    return await this.itemModel.findById(id).exec();
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async removeItem(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndDelete(id).exec();
  }
}
