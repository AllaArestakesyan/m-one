import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { RegisterDTO } from 'src/user/dto/auth.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('psql') private pool: Pool) { }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }

  // Register a user
  async createUser(user: RegisterDTO) {
    const { first_name, last_name, age, email, password } = user;
    const result = await this.pool.query(
      'INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, age, email, password],
    );
    return result.rows[0];
  }

  // Find a user by email
  async findByEmail(email: string) {
    const user = await this.pool.query("select * from users where email=$1", [email]);
    return user.rows[0];
  }

  // Find a user by id
  async findOneById(id: number) {
    const user = await this.pool.query("select * from users where id=$1", [id]);
    return user.rows[0];
  }

  // Search users by first name, last name, and age
  async searchUsers(searchUserDto:SearchUserDto): Promise<any[]> {
    const {first_name, last_name, age} = searchUserDto;
    console.log(searchUserDto);
    
    let query = `SELECT id, first_name, last_name, age, email FROM users WHERE 1=1 `;
    const values: any[] = [];
    if (first_name) {
      query += ` AND first_name ILIKE $${values.length + 1}`;
      values.push(`%${first_name}%`);
    }
    if (last_name) {
      query += ` AND last_name ILIKE $${values.length + 1}`;
      values.push(`%${last_name}%`);
    }
    if (age) {
      query += ` AND age = $${values.length + 1}`;
      values.push(age);
    }
    console.log("===>",query);
    
    const result = await this.pool.query(query, values);
    return result.rows; // Return matching users
  }
}
