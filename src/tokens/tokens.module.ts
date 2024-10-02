import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { UsersModule } from 'src/users/users.module';
import { TokensController } from './tokens.controller';
import { TokensRepository } from './tokens.repository';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    // UsersModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [TokensController],
  providers: [TokensService, TokensRepository],
  exports: [TokensService, TokensRepository],
})
export class TokensModule {}
