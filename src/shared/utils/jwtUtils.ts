import { JwtService } from '@nestjs/jwt';

export function generateToken(
  jwtService: JwtService,
  tokenClaims: any,
  tokenSecretKey: string,
  tokenExpireTime: string,
) {
  return jwtService.sign(tokenClaims, {
    secret: tokenSecretKey,
    expiresIn: tokenExpireTime,
  });
}
