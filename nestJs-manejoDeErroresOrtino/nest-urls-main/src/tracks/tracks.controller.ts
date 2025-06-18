import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TracksService } from './tracks.service';

// localhost:3000/api/tracks
@Controller('api/tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    getAll() {
        return this.tracksService.getAll();
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.tracksService.getOne(id);
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() track: any) {
        return this.tracksService.create(track);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        await this.tracksService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.tracksService.delete(id);
    }
}
