import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email cannot be null or empty!');
    }
    const [userDetail] = await this.userModel.find({ email });
    if (!userDetail) {
      throw new NotFoundException('User not found. Please try again!');
    }
    return userDetail;
  }

  findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Email cannot be null or empty!');
    }
    return this.userModel.findOne({ id });
  }
}
