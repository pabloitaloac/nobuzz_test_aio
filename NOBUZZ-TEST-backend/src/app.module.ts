import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './connection/auth/jwt.strategy';
const crypto = require('crypto');

import { Task } from './connection/modules/task.entity'; 
import { User } from './connection/modules/user.entity'; 

const secretKey = '1234567890';


@Module({
  imports: [
    
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '1h' },
    }),

    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "postgres",
      "port": 5432,
      "username": "nobuzztest",
      "password": "nobuzztest",
      "database": "nobuzztest",
      "entities": ["dist/**/*.entity.js"],
      "synchronize": true
    }
    ),
    
    TypeOrmModule.forFeature([Task,User])],
    
    controllers: [AppController],

    providers: [AppService,JwtStrategy],

})
export class AppModule {}  
