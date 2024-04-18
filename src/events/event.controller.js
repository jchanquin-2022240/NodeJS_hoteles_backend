import { response, request } from 'express';
import Event from './event.js'

export const eventsPost = async (req, res) => {
    const { nameEvent, descriptionEvent, date, typeEvent,  resources, additionalServices } = req.body;

    
    const event = new Event({
        nameEvent,
        descriptionEvent,
        date,
        typeEvent,
        resources, 
        additionalServices
    });

    await event.save();

    res.status(200).json({
        event
    })

}

export const eventPut = async(req, res)  => {
    const { id } = req.params;
    const { _id, state, ...resto} = req.body;
}

export const eventsGet = async(req, res) => {
    const { limite, desde} = req.query;
    const query = {state: true};

    const eventsList = await Event.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const totalEvents = await Event.countDocuments(query);

        const eventsFormatted = eventsList.map(event => ({
            nameEvent: event.nameEvent,
            descriptionEvent: event.descriptionEvent,
            date: event.date,
            typeEvent: event.typeEvent,
            resources: event.resources,
            additionalServices: event.additionalServices,
        }));
    res.status(200).json({
        total: totalEvents,
        events: eventsFormatted
    })
    
}


export const eventDelete = async(req, res) => {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, { state: false});
    const eventAuthentic = await Event.findById(id);


    res.status(200).json({
        msg: 'Event Removed',
        event,
        eventAuthentic

    })
}