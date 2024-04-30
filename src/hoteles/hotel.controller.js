import { response, request } from "express";
import Hotel from './hotel.model.js';

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

export const addBedroom = async (req, res) => {

    try {

        const { idHotel } = req.params;
        const { idBedroom } = req.body;

        const hotel = await Hotel.findById(idHotel);

        if (!hotel) {
            return res.status(404).json({ error: `${hotel.nameHotel} not found` });
        }

        if (!idBedroom) {
            return res.status(400).json({ error: 'Bedroom ID is required' });
        }

        const bedroom = await Bedroom.findById(idBedroom);
        if (!bedroom) {
            return res.status(404).json({ error: 'Bedroom not found' });
        }

        if (bedroom.estado === false) {
            return res.status(400).json({ error: 'Bedroom is not available' });
        }

        const existingHotel = await Hotel.findOne({ bedrooms: idBedroom });
        if (existingHotel) {
            return res.status(400).json({ error: 'Bedroom is already assigned to another hotel' });
        }

        hotel.bedrooms.push(idBedroom);

        await hotel.save();

        return res.status(200).json({ message: `Bedroom with ID ${idBedroom} added to hotel called ${hotel.nameHotel}` });
    } catch (error) {

        return res.status(500).json({ error: 'Error adding bedroom to hotel' });
    }
};

export const removeBedroom = async (req, res) => {

    try {

        const { idHotel } = req.params;
        const { idBedroom } = req.body;

        const hotel = await Hotel.findById(idHotel);

        if (!hotel) {
            return res.status(404).json({ error: `${hotel.nameHotel} not found` });
        }

        if (!idBedroom) {
            return res.status(400).json({ error: 'Bedroom ID is required' });
        }

        const index = hotel.bedrooms.indexOf(idBedroom);
        if (index === -1) {
            return res.status(404).json({ error: `Bedroom not found in hotel called ${hotel.nameHotel}` });
        }

        hotel.bedrooms.splice(index, 1);

        await hotel.save();

        return res.status(200).json({ message: `Bedroom with ID ${idBedroom} removed from hotel called ${hotel.nameHotel}` });
    } catch (error) {

        return res.status(500).json({ error: 'Internal server error' });
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

        res.status(500).json({ error: 'Error getting hotels' });
    }
}

export const updateHotel = async (req, res) => {

    try {

        const { id } = req.params;
        const { _id, ...remain } = req.body;

        await Hotel.findByIdAndUpdate(id, remain);

        const hotel = await Hotel.findOne({ _id: id });

        res.status(200).json({ msg: 'Hotel has been update', hotel })

    } catch (error) {

        res.status(500).json({ error: 'Error when updating hotel' });
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