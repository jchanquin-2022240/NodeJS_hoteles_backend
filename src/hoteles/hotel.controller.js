import { response, request } from "express";
import Hotel from './hotel.model.js';
// import Bedroom from '../src/bedroom/bedroom.model.js'


/* 
metodo para la creacion de hoteles, en sprint 1 no agregara habitaciones por principios,
cuando se tenga la parte de habitaciones se hara la conexion para agregar habitaciones
dentro de un hotel, incluyendo las demas partes del crud
*/

export const createHotel = async (req, res) => {
    try {

        const { nameHotel, description, installations, location, category } = req.body;

        const hotel = new Hotel({ nameHotel, description, installations, location, category });

        await hotel.save();

        res.status(201).json({ msg: "Hotel successfully created", hotel })
    } catch (error) {

        res.status(500).json({ msg: "Error creating hotel" });
    }
};

// visualizacion para administradores

export const getHotels = async (req, res) => {

    try {

        const { nameHotel, description, installations, location, category, status } = req.query;

        const filter = {};
        if (nameHotel) filter.nameHotel = { $regex: nameHotel, $options: 'i' };
        if (description) filter.description = { $regex: description, $options: 'i' };
        if (installations) filter.installations = { $regex: installations, $options: 'i' };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (category) filter.category = { $regex: category, $options: 'i' };
        if (status !== undefined) filter.status = status;

        const hotels = await Hotel.find(filter);

        const total = hotels.length;

        res.status(200).json({ total, hotels });
    } catch (error) {

        console.error('Error getting hotels:', error);
        res.status(500).json({ error: 'Error getting hotels' });
    }
};

// visualizacion para usuarios

export const getHotelsAvailable = async (req, res) => {
    try {

        const { nameHotel, description, installations, location, category, status } = req.query;

        const filter = {};
        if (nameHotel) filter.nameHotel = { $regex: nameHotel, $options: 'i' }; 
        if (description) filter.description = { $regex: description, $options: 'i' }; 
        if (installations) filter.installations = { $regex: installations, $options: 'i' }; 
        if (location) filter.location = { $regex: location, $options: 'i' }; 
        if (category) filter.category = { $regex: category, $options: 'i' }; 

        if (status === undefined) filter.status = true;

        const hotels = await Hotel.find(filter);

        const total = hotels.length;

        res.status(200).json({ total, hotels });
    } catch (error) {

        console.error('Error getting hotels:', error);
        res.status(500).json({ error: 'Error getting hotels' });
    }
}

export const updateHotel = async (req, res) => {

}

export const deleteHotel = async (req, res) => {

}