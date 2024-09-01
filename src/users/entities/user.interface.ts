import { Request } from 'express';
import { Payload } from 'src/auth/entities/payload.entity';

export class RequestWithUser extends Request {
  user: Payload;
}
