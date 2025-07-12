import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { ValidationPipe } from '@nestjs/common';


@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number):Promise<Cliente | null> {
    return this.clienteService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id:number){
    return this.clienteService.remove(id);
  }

  @Post()
  async create(@Body(new ValidationPipe({transform:true})) clienteDto:ClienteDto):Promise<ClienteDto>{
    console.log("datos recibidos para crear"+clienteDto);
    return this.clienteService.create(clienteDto);
  }

  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body(new ValidationPipe({transform:true})) clienteDto:ClienteDto){
    return this.clienteService.update(id,clienteDto);
  }

}
