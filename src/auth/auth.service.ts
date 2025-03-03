import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from '../user/dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userId: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role
    };
  }

  async register(userDto: RegisterDTO) {
    const { email, first_name, last_name, password, age } = userDto;
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new HttpException('Email is already in use.', HttpStatus.BAD_REQUEST);
    } else {
      const createdUser = await this.userService.createUser({
        first_name,
        last_name,
        email,
        age,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        message: "Registration successful.",
        user: createdUser
      };
    }
  }
}