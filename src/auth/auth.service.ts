import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogoutUserDto } from './dto/logout-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found. Please try again!');
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new NotFoundException('Password is wrong. Please try again!');
      }
      const payload = { email: user.email };
      // const { password, ...user } = isMatch;
      return {
        access_token: await this.jwtService.sign(payload),
      };
    }
  }

  async signout(logoutUserDto: LogoutUserDto) {
    const user = await this.authRepository.findByEmail(logoutUserDto.email);
    if (!user) {
      throw new NotFoundException('User not found. Please try again!');
    }

    // await this.tokensRepository.deleteByEmail(logoutUserDto.email);

    return user.email;
  }
}
