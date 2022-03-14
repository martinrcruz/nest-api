import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MensajeDto } from '../dto/mensaje-dto';
import { Mensaje } from '../entities/mensaje.entity';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
    ) { }

    async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }
    
    async getOneById(idMensaje: number): Promise<Mensaje> {
        return await this.mensajeRepository.findOne(idMensaje);
    }

    async createMensaje(mensajeNuevo: MensajeDto): Promise<Mensaje> {
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;
        return this.mensajeRepository.save(nuevo);
    }

    async updateMensaje(idMensaje: number, mensajeActualizar: MensajeDto): Promise<Mensaje> {
        const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return this.mensajeRepository.save(mensajeUpdate);
    }

    async deleteMensaje(idMensaje: number): Promise<any> {
        return await this.mensajeRepository.delete(idMensaje);
    }

}