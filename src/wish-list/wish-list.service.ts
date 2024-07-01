import { Injectable } from '@nestjs/common';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { WishList } from './entities/wish-list.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WishListService {
  constructor(@InjectModel(WishList.name) private readonly wishListModel: Model<WishList>) {}

  async createWishList(createWishListDto: CreateWishListDto): Promise<WishList> {
    const products = createWishListDto.product.map(p => ({
      product_id: p.product_id,
      product_name: p.product_name,
      price: p.price,
      quantity: p.quantity,
    }));

    const createdWishList = new this.wishListModel({
      wishlist_id: createWishListDto.wishlist_id,
      wishlist_name: createWishListDto.wishlist_name,
      budget: createWishListDto.budget,
      product: products,
    }).save();

    return createdWishList;
  }

  async findAllWishLists() : Promise<WishList[]>{
    return await this.wishListModel.find().exec();
  }

  async findOneWishList(id: string): Promise<WishList> {
    return await this.wishListModel.findById(id).exec();
  }

  async updateWishList(id: string, updateWishListDto: UpdateWishListDto): Promise<WishList> {
    return await this.wishListModel.findByIdAndUpdate(id, updateWishListDto, { new: true }).exec();
  }

  async removeWishList(id: string): Promise<WishList> {
    return await this.wishListModel.findByIdAndDelete(id).exec();
  }
}