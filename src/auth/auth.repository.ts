import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

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
