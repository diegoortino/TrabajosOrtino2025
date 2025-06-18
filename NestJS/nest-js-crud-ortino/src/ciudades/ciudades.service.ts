import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';


@Injectable()
export class CiudadesService {
  private readonly baseUrl = 'http://localhost:3001/ciudades';

    async getAll(){
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        return data;
    }
    
    async getOne(id:string){
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data;
    }

    async create(ciudad:any){
        const response = await fetch(this.baseUrl,
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(ciudad)
            }
        )
        if(!response.ok)
            throw new Error('Error al crear la ciudad');
        else
            return "se creo la ciudad con exito";

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
            throw new Error('Error al editar la ciudad');
        else
            return "Se edito la ciudad con exito";

    }

    async delete(id:number){
        const response = await fetch(this.baseUrl + "/" + id,{
            method:'DELETE'
        })

        if(!response.ok)
            throw new Error('Error al eliminar la ciudad');
        else
            return response.statusText;
    }
}