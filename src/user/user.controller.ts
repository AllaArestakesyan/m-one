import { Controller, Get, Post, Body, Param, Query, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchUserDto } from './dto/search-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  // Search for users by first name, last name, and age
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description:"Search for users by first name, last name, and age"
  })
  @ApiBearerAuth('JWT-auth')
  @Get('search')
  async search(@Query() searchUserDto: SearchUserDto) {
    return this.userService.searchUsers(searchUserDto);
  }

}
