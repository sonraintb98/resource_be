import { Request } from 'express';
import { UserDto } from 'src/shared/dto';

interface RequestWithUser extends Request {
  user: UserDto;
}

export default RequestWithUser;
