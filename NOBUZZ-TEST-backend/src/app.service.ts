import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm';


import { Task } from './connection/modules/task.entity';
import { User } from './connection/modules/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'HI, EVERYONE!<br>please, use the following routes to access the API features:<br><li>/all-data => get all data</li><li>/new-task => create new task</li>';
  }

  async getAllData(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async newData(newTaskData: { title: string, description: string , status: boolean }): Promise<Task> {
    const { title, description, status } = newTaskData;

    const newTask = this.taskRepository.create({
      title: title,
      description: description,
      status:status,
      createdAt: new Date(),
      completedAt: status? new Date() : null,
    });

    return this.taskRepository.save(newTask);
  }
  async updateData(newTaskData: {id:number, title: string, description: string , status: string, completedAt: Date, isDelete:boolean }): Promise<Task> {
    const { id, title, description, status, completedAt , isDelete} = newTaskData;

    console.log(newTaskData);
    if(typeof id === 'string'){
      return this.newData({
        title:title,
        description:description,
        status:status==='Completo'? true : false,
      })
    }
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    } as FindOneOptions<Task>);
    
    if (!existingTask) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    if(isDelete){
      return this.taskRepository.remove(existingTask)
    }
    else{
      existingTask.title = title;
      existingTask.description = description;
      existingTask.status = status==='Completo'? true : false;
      existingTask.completedAt = completedAt;
      
      return this.taskRepository.save(existingTask);
    }
  }
  

  async newUser(newUserData: { username: string, password: string , name:string,   }): Promise<{ user: User; token: string }> {
    const { username, password , name} = newUserData;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newTask = this.userRepository.create({
        name:name,
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      });
      const savedUser = await this.userRepository.save(newTask);
      const token = this.jwtService.sign(
        { sub: savedUser?.id , username: savedUser?.username },
        { expiresIn: '1h' } 
      );

      console.log(token);
      
            return { user: savedUser, token };
  } catch (error) {
      console.error(error);
      return { user: null, token: '' };
  }
  }


  async login(newUserData: { username: string, password: string }): Promise<{ user: User; token: string } | null> {
    const { username, password } = newUserData;
  
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return { user:null, token:null };
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { user:null, token :null};
    }
  
    const token = this.jwtService.sign({ sub: user?.id , username: user?.username }, { expiresIn: '1h' });

    console.log(token);
    

    return { user, token:token };
  }
    


}
