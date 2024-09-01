import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Payload } from './entities/payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);

    const payload: Payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    return {
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    if (user.isDeleted) {
      throw new BadRequestException(
        'User is deleted, call with the suport to more informations',
      );
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Email ou senha errados');
    }

    const payload: Payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    return {
      accessToken,
    };
  }
}
