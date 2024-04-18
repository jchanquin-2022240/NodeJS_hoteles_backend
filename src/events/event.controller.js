import { response, request } from 'express';
import Event from './event.js'

export const eventsPost = async (req, res) => {
    const { nameEvent, descriptionEvent, date, typeEvent,  resources, additionalServices } = req.body;

    
    const event = new Event ({nameEvent, descriptionEvent, date, typeEvent,  resources, additionalServices});

    await event.save();

    res.status(200).json({
        event
    })

}