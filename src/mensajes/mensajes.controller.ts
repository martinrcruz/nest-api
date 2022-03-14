import { Controller, Post, Get, Put, Delete, Param, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { response } from 'express';
import { MensajeDto } from './dto/mensaje-dto';
import { MensajesService } from './mensajes/mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajesServices: MensajesService) {

    }

    @Post()
    create(@Body() createMensajeDto: MensajeDto, @Res() response) {
        this.mensajesServices.createMensaje(createMensajeDto).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje)
            }
        ).catch(() =>
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la creacion del mensaje' })
        );
    }

    @Get()
    getAll(@Res() response) {
        this.mensajesServices.getAll().then(
            mensajeList => {
                response.status(HttpStatus.OK).json(mensajeList)
            }
        ).catch(() =>
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la obtencion del mensaje' })
        );
    }


    @Put(':id')
    update(@Body() updateMensajeDto: MensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajesServices.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la edicion del mensaje' })

        })
    }

    @Delete(':id')
    remove(@Res() response, @Param('id') idMensaje) {
        this.mensajesServices.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res)

        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la eliminacion del mensaje' })

        })
    }

    @Get(':id')
    findOne(@Res() response, @Param('id') idMensaje) {
        this.mensajesServices.getOneById(idMensaje).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la busqueda del mensaje' })

        })
    }
}
