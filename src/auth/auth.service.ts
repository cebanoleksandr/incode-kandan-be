import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password, fullname } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new this.userModel({ email, password: hashedPassword, fullname });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) { // duplicate email
        throw new ConflictException('User already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string, user: User }> {
    const { email, password } = loginCredentialsDto;
    const user: User = await this.userModel.findOne({ email }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken, user };
    } else {
      throw new UnauthorizedException('Please, check your login credentials');
    }
  }
}
