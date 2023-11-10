import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './connection/modules/task.entity'; 
import { User } from './connection/modules/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Task,User])],
})
export class TasksModule {}
 