import { response, request } from "express";
import Hotel from './hotel.model.js';
import multer from 'multer';
import upload from './multerConfig.js';


export const createHotel = async (req, res) => {

    try {

        const { nameHotel, description, installations, location, category } = req.body;

        const photo = req.file ? req.file.path : '';

        const newHotel = new Hotel({

            nameHotel,
            photo,
            description,
            installations,
            location,
            category
        });

        const savedHotel = await newHotel.save();

        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

        res.status(500).json({ error: 'Error getting hotels' });
    }
};

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

        res.status(500).json({ error: 'Error getting hotels' });
    }
}

export const getHotelById = async (req, res) => {

    try {
        
        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {

            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json(hotel);
    } catch (error) {

        res.status(500).json({ error: 'Error getting hotel details' });
    }
};

export const updateHotel = async (req, res) => {

    try {

        const { id } = req.params;
        const { nameHotel, description, installations, location, category } = req.body;
        const photo = req.file ? req.file.path : undefined;

        const updatedFields = { nameHotel, description, installations, location, category };
        if (photo) updatedFields.photo = photo;

        const updatedHotel = await Hotel.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json(updatedHotel);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const deleteHotel = async (req, res) => {

    try {

        const { id } = req.params;

        const hotel = await Hotel.findByIdAndUpdate(id, { status: false });

        res.status(200).json({ msg: 'Hotel has been disable', hotel })
    } catch (error) {

        res.status(500).json({ error: 'Error when deleting hotel' });
    }

}