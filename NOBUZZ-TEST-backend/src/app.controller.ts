import { Controller, Get, Post, Body , UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './connection/auth/JwtAuthGuard';
import { Task } from './connection/modules/task.entity'
import { User } from './connection/modules/user.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('all-data')
  @UseGuards(JwtAuthGuard)
  async getAllData(): Promise<Task[]> {
    const tasks = await this.appService.getAllData();
    return tasks;
  }


  @Post('new-task')
  @UseGuards(JwtAuthGuard)
  async newData(@Body() newTaskData: { title: string; description: string, status:boolean }): Promise<Task> {
    return this.appService.newData(newTaskData);
  }
   
  @Post('edit-task')
  @UseGuards(JwtAuthGuard)
  async updateData(@Body() newTaskData: {id:number, title: string, description: string , status: string, completedAt: Date ,isDelete:boolean}): Promise<Task> {
    return this.appService.updateData(newTaskData);
  }
   
  @Post('new-user')
    async newUser(@Body() newUser: { username: string; password: string; name: string }): Promise<{ user: User; token: string }> {
    try {
      const result = await this.appService.newUser(newUser);

      if ('user' in result && 'token' in result) {
        return result as { user: User; token: string };
      } 
      else {
        console.error('Invalid result structure:', result);
        return { user: null, token: '' };
      }
    } catch (error) {
      console.error(error);
      return { user: null, token: '' };
    }
  }
    
  @Post('login')
    async login(@Body() userData: { username: string; password: string }): Promise<{ user: User; token: string } | null> {
    const result = await this.appService.login(userData);
  
    if (result) {
      return result;
    } else {
      return { user:null, token :null};
    }
  }
    




}












