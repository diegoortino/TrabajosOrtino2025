import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

  private baseUrl = 'http://localhost:3001/users/';

  async create(createUserDto: CreateUserDto) {
    try{
      const response = await fetch(this.baseUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createUserDto),
      });

      if(response.status === 400)
        throw new BadRequestException('Datos enviados mal a la api');

      if(response.status === 409)
        throw new ConflictException('El usuario ya existe en la api');

      if(!response.ok)
        throw new Error('Error al crear el usuario');

      const data = await response.json();

      return plainToInstance(UserDto, data, { excludeExtraneousValues: true });
      
    }catch(err){
      if(err instanceof BadRequestException){
        throw new BadRequestException('Datos enviados mal a la api');
      }else if(err instanceof ConflictException){
        throw new ConflictException('El usuario ya existe en la api');
      }else{
        throw new Error('Error al crear el usuario');
      }

    }



  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string):Promise<UserDto> {
    console.log(this.baseUrl+"/"+id)
    const response = await fetch(this.baseUrl+id);
    const data = await response.json();
    return plainToInstance( UserDto , data , { excludeExtraneousValues: true } );

  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
