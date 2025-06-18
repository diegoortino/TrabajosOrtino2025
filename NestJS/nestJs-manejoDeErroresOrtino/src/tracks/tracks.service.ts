import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class TracksService {
    private baseUrl = 'http://localhost:3001/tracks/';

    async getAll() {
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) {
                throw new NotFoundException('No se encontraron tracks en esa URL.');
            }
            return await response.json();
        } catch (error) {
            throw new HttpException('Error al obtener los tracks.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(id: number) {
        try {
            const response = await fetch(`${this.baseUrl}${id}`);
            if (!response.ok) {
                throw new NotFoundException(`No se encontró el track con ID ${id}.`);
            }
            return await response.json();
        } catch (error) {
            throw new HttpException('Error al obtener el track.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(track: any) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(track),
            });
            if (!response.ok) {
                throw new BadRequestException('Error al crear el track.');
            }
        } catch (error) {
            throw new HttpException('Error al crear el track.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, body: any) {
        try {
            const response = await fetch(`${this.baseUrl}${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new NotFoundException(`No se encontró el track con ID ${id} para actualizar.`);
            }
        } catch (error) {
            throw new HttpException('Error al actualizar el track.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        try {
            const response = await fetch(`${this.baseUrl}${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new NotFoundException(`No se encontró el track con ID ${id} para eliminar.`);
            }
        } catch (error) {
            throw new HttpException('Error al eliminar el track.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}