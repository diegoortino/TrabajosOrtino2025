import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class TracksService {

    private tracks = [
        {id:1,title:'De musica ligera',artist:'Cerati'},
        {id:2,title:'Detenador de Suenos',artist:'La Renga'},
        {id:3,title:'La Balsa',artist:'Los Gatos'},
    ]

    getAll(){
        return this.tracks;
    }
    
    getOne(id:number){
        for(let i=0;i<this.tracks.length;i++){
            if(this.tracks[i].id === id){
                return this.tracks[i];
            }
            else
                return null;
        }
    }


    create(track:any){
        let maxId = 0;
        for(let i=0;i<this.tracks.length;i++){
            if(this.tracks[i].id > maxId)
                maxId = this.tracks[i].id;
        }

        const newTrack ={
            id: maxId+1,
            title:track.title,
            artist:track.artist
        }

        this.tracks.push(newTrack);
        return "se creo el track con exito!!";
    }

    update(id:number,body:any){
        for(let i=0;i<this.tracks.length;i++){
            if(this.tracks[i].id === id){
                if(body.title !== undefined)
                    this.tracks[i].title = body.title;
                if(body.artist !== undefined)
                    this.tracks[i].artist = body.artist;
                return this.tracks[i];
            }
        }
        return "no se encontro el track a actualizar!!"
    }

    delete(id:number){
        for(let i=0;i<this.tracks.length;i++){
            if(this.tracks[i].id === id){
                this.tracks.splice(i,1)
                return "se elimino el track con exito!!";
            }
        }
    }

}
