import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, Res } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendFriendRequestDto } from './dto/create-friend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';
import { StatusFreinds } from './status/enum';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'user_id - The user who is receiving the request'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() sendFriendRequestDto: SendFriendRequestDto, @Request() req, @Res() res: Response) {
    try {
      const data = await this.friendsService.create(sendFriendRequestDto, req.user.userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'The friend request is confirmed based on the user_id.'
  })
  @ApiBearerAuth('JWT-auth')
  @Post("accepted")
  async accepted(@Body() sendFriendRequestDto: SendFriendRequestDto, @Request() req, @Res() res: Response) {
    try {
      const data = await this.friendsService.changeStatus(sendFriendRequestDto, req.user.userId, StatusFreinds.ACCEPTED);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'The friend request is declined based on the user_id.'
  })
  @ApiBearerAuth('JWT-auth')
  @Post("declined")
  async declined(@Body() sendFriendRequestDto: SendFriendRequestDto, @Request() req, @Res() res: Response) {
    try {
      const data = await this.friendsService.changeStatus(sendFriendRequestDto, req.user.userId, StatusFreinds.DECLINED);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get("request/list")
  async requestList(@Request() req, @Res() res: Response) {
    try {
      const data = await this.friendsService.requestsList(req.user.userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get("list")
  async friendsList(@Request() req, @Res() res: Response) {
    try {
      const data = await this.friendsService.friendsList(req.user.userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}