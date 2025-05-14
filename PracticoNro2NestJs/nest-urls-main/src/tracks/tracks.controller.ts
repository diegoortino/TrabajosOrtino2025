import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TracksService } from './tracks.service';


// localhost:3000/api/tracks

@Controller('api/tracks')
export class TracksController {

    constructor(private readonly tracksService:TracksService){}

    @Get('')
    getAll(){
        return this.tracksService.getAll();
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('id',ParseIntPipe) id:number){
        return this.tracksService.getOne(id);
    }

    @Post('')
    create(@Body() track:any){
        return this.tracksService.create(track);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() body:any){
        return this.tracksService.update(+id,body)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.tracksService.delete(+id);
    }

    

}
