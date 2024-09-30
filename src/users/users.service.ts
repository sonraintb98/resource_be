import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { failureResponse, successResponse } from 'src/shared/responses';
import { PaginationDto } from 'src/shared';
import responseMessage from 'src/common/messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(userDto: CreateUserDto) {
    // See if email is in use
    const user = await this.usersRepository.findByEmail(userDto.email);
    if (user) {
      throw new BadRequestException(
        'The email is already used, please choose another one to sign up!',
      );
    }

    // Hash the user password
    // Generate a salt
    // const salt = randomBytes(8).toString('hex');
    // Hash salt and password together
    // const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;
    // Join hashed result and the salt together
    // const result = salt + '.' + hash.toString('hex');

    // Hash the user password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashPassword;
    // Create a new user and save it
    const newUser = await this.usersRepository.create(userDto);

    return newUser;
  }

  async getAllUsers(paginationDto?: PaginationDto) {
    let res = successResponse();
    try {
      const usersResponse = await this.usersRepository.paginate(
        { isDeleted: false },
        paginationDto,
      );
      res.data = usersResponse.data;
      res.pagination = usersResponse.pagination;
    } catch (error) {
      res = failureResponse(
        [],
        error.message || responseMessage.unknownException,
      );
    }

    return res;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.getUserByEmail(updateUserDto.email);
    if (!user) {
      throw new HttpException(
        'Can not find data by id. Please try again!',
        HttpStatus.NOT_FOUND,
      );
    }
    user.password = updateUserDto.password;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.image = updateUserDto.image;
    user.activated = updateUserDto.activated;
    user.role = updateUserDto.role;

    const updateUser = new this.userModel(user);
    return updateUser.save();
  }

  async remove(email: string) {
    const user = await this.usersRepository.findOne(email);
    if (user) {
      throw new Error('User not found. Please try again!');
    }
    // return this.userModel.remove(user);
  }
}
