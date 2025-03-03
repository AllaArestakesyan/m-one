import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FriendsModule } from './friends/friends.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    AuthModule, 
    UserModule, 
    FriendsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
