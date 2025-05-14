import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class TracksService {

    private baseUrl = 'http://localhost:3001/tracks/';

    async getAll(){
        try{                   
            const response = await fetch(this.baseUrl);

            if(!response.ok)
                throw new NotFoundException('No se encontraron tracks en esa url');       
       
            const data = await response.json();
            return data;
        } catch(err){
            if(err instanceof NotFoundException){
                throw new NotFoundException('No se encontraron tracks en esa url');
            }
            throw new Error('Fallo el metodo getAll()')
        }

    }
    
    async getOne(id:number){
        console.log(this.baseUrl + id)
        const response = await fetch(this.baseUrl + id);
        const data = await response.json();
        return data;
    }

    async create(track:any){
        const response = await fetch(this.baseUrl,
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(track)
            }
        )
        if(!response.ok)
            throw new Error('Error al crear el track');
        else
            return "";

    }

    async update(id:number,body:any){
        const response = await fetch(this.baseUrl + "/" + id,
            {
                method:'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
        )

        if(!response.ok)
            throw new Error('Error al EDITAR el track');
        else
            return "se EDITO el track con exito!";

    }

    async delete(id:number){
        const response = await fetch(this.baseUrl + "/" + id,{
            method:'DELETE'
        })

        if(!response.ok)
            throw new Error('Error al Elimino el track');
        else
            return response.statusText;
    }

}
