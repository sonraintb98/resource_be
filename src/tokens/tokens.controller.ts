import { Controller, Post, Body } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { TokensService } from './tokens.service';

@Controller('token')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post('create')
  async createToken(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.createToken(createTokenDto);
  }

  @Post('exchange')
  async exchangeToken(@Body() exchangeTokenDto: CreateTokenDto) {
    return this.tokensService.exchangeToken(exchangeTokenDto);
  }

  @Post('revoke')
  async revokeToken(@Body() revokeTokenDto: RevokeTokenDto) {
    return this.tokensService.revokeToken(revokeTokenDto);
  }
}
