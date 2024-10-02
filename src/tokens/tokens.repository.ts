import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Token, TokenDocument } from 'src/schemas/token.schema';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokensRepository {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const newProject = new this.tokenModel(createTokenDto);
    return newProject.save();
  }

  // This function will give you the object after update was applied.
  async findOneAndUpdate(
    filter: FilterQuery<Token>,
    updateToken: UpdateQuery<Token> | Token,
  ): Promise<Token> {
    return this.tokenModel
      .findOneAndUpdate(
        filter,
        { $set: updateToken },
        {
          new: true,
          upsert: false,
        },
      )
      .exec();
  }

  async deleteByEmail(
    email: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel.deleteMany({ email: email }).exec();
  }

  async deleteByEmailAndRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel
      .deleteMany({ email: email, refreshToken: refreshToken })
      .exec();
  }

  async deleteByEmailAndIdToken(
    email: string,
    idToken: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel
      .deleteMany({ email: email, idToken: idToken })
      .exec();
  }
}
