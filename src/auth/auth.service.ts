import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async register(createUserDTO: CreateUserDTO) {
    const isUserExist = await this.userService.findUser(createUserDTO.username);
    if (!isUserExist) {
      await this.userService.addUser(createUserDTO);
      return;
    }
    throw new ConflictException('This user already exist');
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };
    const abc = this.jwtService.sign(payload);
    return {
      access_token: abc,
    };
  }
}
