import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';

@Controller('api/ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Get()
  async findAll() {
    return this.ciudadesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
  return this.ciudadesService.getOne(id);
  }


  @Post()
  async create(@Body() ciudad: any) {
        return this.ciudadesService.create(ciudad);
    }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
        await this.ciudadesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.ciudadesService.delete(+id);
  }
}