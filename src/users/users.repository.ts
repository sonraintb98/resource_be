import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery, Model } from 'mongoose';
import { PaginationDto } from 'src/shared';
import { CONST, Pagination } from 'src/common';

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

  async paginate(
    filter?: FilterQuery<User>,
    pagination?: PaginationDto,
  ): Promise<{ data: User[]; pagination: Pagination }> {
    const page: number = pagination?.page || CONST.DEFAULT_START_PAGE;
    const limit: number = pagination?.limit || CONST.DEFAULT_LIMIT_QUERY;
    const count = await this.userModel.count(filter).exec();
    const data = await this.userModel
      .find(filter, null, {
        sort: {
          _id: -1, // -1: DESC; 1: ASC
        },
        skip: (page - 1) * limit,
        limit: Number(limit),
      })
      .exec();

    return { data: data, pagination: { total: count, page, limit } };
  }

  async findOneSon(filter: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(filter);
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.findOneSon({ email: email, activated: true });
  }
}
