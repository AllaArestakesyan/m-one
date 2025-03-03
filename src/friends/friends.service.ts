import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { SendFriendRequestDto } from './dto/create-friend.dto';
import { StatusFreinds } from './status/enum';

@Injectable()
export class FriendsService {
  constructor(@Inject('psql') private pool: Pool) { }

  async create(sendFriendRequestDto: SendFriendRequestDto, from_id: number) {
    const { user_id } = sendFriendRequestDto;
    if (user_id == from_id) {
      return { message: "You cannot send a request to yourself" }
    }
    const toUser = await this.pool.query("select * from users where id=$1", [user_id]);
    if (!toUser.rows[0]) {
      return { message: user_id + " user not found" }
    }
    const fromUser = await this.pool.query("select * from users where id=$1", [from_id]);
    if (!fromUser.rows[0]) {
      return { message: from_id + " user not found" }
    }

    const request = await this.pool.query("select * from friend_request where (from_id = $1 AND to_id = $2)  OR (from_id = $2 AND to_id = $1)",
      [from_id, user_id]);
    if (request.rows[0]) {
      return { message: "you have already sent a request" }
    }
    const friends = await this.pool.query("select * from friends where (from_id = $1 AND to_id = $2)  OR (from_id = $2 AND to_id = $1)",
      [from_id, user_id]);
    if (friends.rows[0]) {
      return { message: "you are already friends" }
    }
    const result = await this.pool.query(
      'INSERT INTO friend_request (from_id, to_id) VALUES ($1, $2) RETURNING *',
      [from_id, user_id],
    );
    return result.rows[0];
  }

  async changeStatus(sendFriendRequestDto: SendFriendRequestDto, from_id: number, status: StatusFreinds) {
    const { user_id } = sendFriendRequestDto;
    const request = await this.pool.query("select * from friend_request where (from_id = $1 AND to_id = $2)  OR (from_id = $2 AND to_id = $1)",
      [from_id, user_id]);
    if (!request.rows[0]) {
      return { message: "request not found" }
    }
    await this.pool.query(
      `delete from friend_request
      WHERE (from_id = $1 AND to_id = $2) 
         OR (from_id = $2 AND to_id = $1)`,
      [from_id, user_id],
    );
    if (status == StatusFreinds.ACCEPTED) {
      const result = await this.pool.query(
        'INSERT INTO friends (from_id, to_id) VALUES ($1, $2) RETURNING *',
        [from_id, user_id],
      );
      return result.rows;
    } else {
      return {
        message: "The request has been deleted."
      }
    }
  }
  async requestsList(user_id: number) {
    const result = await this.pool.query("select friend_request.*, users.first_name as first_name,users.last_name as last_name from friend_request INNER JOIN users on users.id = friend_request.from_id where friend_request.to_id = $1 ",
      [user_id]);
    return result.rows;
  }
  async friendsList(user_id: number) {
    const result = await this.pool.query(`select friends.*, users.first_name as first_name,users.last_name as last_name from friends 
    INNER JOIN users on users.id = friends.from_id or users.id = friends.to_id 
    where (friends.from_id = $1 or friends.to_id = $1) and users.id != $1`,
      [user_id]);
    return result.rows;
  }
}
