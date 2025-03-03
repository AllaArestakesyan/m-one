import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: 'psql',
            inject: [ConfigService],
            useFactory: async () => {            
                const pool = new Pool({
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    host: process.env.DATABASE_HOST,
                    port: process.env.DATABASE_PORT,
                    database: process.env.DATABASE_NAME
                  });
                return pool;
            },
        },
    ],
    exports: ['psql'],
})
export class DatabaseModule { }
