
import { response, request } from 'express';
import Event from './event.js'
import Resource from '../resource/resource.js';

export const eventsPost = async (req, res) => {

    const { nameEvent, descriptionEvent, date, typeEvent, resources,  startTime, endingTime } = req.body;

    let extraMount = 1000;
    let totalPrice = 0;

    const eventDate = new Date(date);
    for (const resourceId of resources) {

        const resource = await Resource.findById(resourceId);

        totalPrice = extraMount + resource.price;
    }
    const formattedPrice = totalPrice.toFixed(2) + "Q";

    const event = new Event({
        nameEvent,
        descriptionEvent,
        date: eventDate,
        typeEvent,
        resources,
        startTime,
        endingTime,
        totalPrice: formattedPrice
    });

    await event.save();

    res.status(200).json({
        event
    })

}

export const eventPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, resources, price, ...resto } = req.body;

    const eventAfter = await Event.findOne({ _id: id })

    const eventLast = await Event.findByIdAndUpdate(id, resto, { new: true })



    res.status(200).json({
        eventLast,
        eventAfter
    })
}

export const eventsGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const totalEvents = await Event.countDocuments(query);


    const events = await Event.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('resources');

    res.status(200).json({
        total: totalEvents,
        events: events
    })

}

export const getEventForName = async (req, res) => {
    const { nameEvent } = req.body;
    const query = { nameEvent: nameEvent };

    const totalEvents = await Event.countDocuments(query);

    const events = await Event.find(query)
        .populate('resources')
        .exec();

    const formattedEvents = events.map(event => {
        return {
            nameEvent: event.nameEvent,
            descriptionEvent: event.descriptionEvent,
            date: event.date,
            typeEvent: event.typeEvent,


            resources: event.resources.map(resource => {
                return {
                    nameResource: resource.nameResource,
                    amount: resource.amount,
                    price: resource.price

                };
            })
        };
    });

    res.status(200).json({
        total: totalEvents,
        events: formattedEvents
    })
}


export const eventDelete = async (req, res) => {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, { state: false });
    const eventAuthentic = await Event.findById(id);


    res.status(200).json({
        msg: 'Event Removed',
        event,
        eventAuthentic

    })
}

export const resourcesAddPost = async (req, res) => {
    const { id } = req.params;
    const { resources } = req.body;

    let event = await Event.findOne({ _id: id });
    const numericTotalPrice = parseFloat(event.totalPrice.match(/\d+\.\d+/)[0]) || 0;
    console.log(numericTotalPrice)

    let totalPrice = numericTotalPrice;
    for (const resourceId of resources) {
        const resource = await Resource.findById(resourceId);
        totalPrice += resource.price;
    }

    const priceTotal = totalPrice.toString() + ".00Q";

    event.resources = event.resources.concat(resources);

    const eventLast = await Event.findByIdAndUpdate(id, { totalPrice: priceTotal, resources: event.resources }, { new: true });

    res.status(200).json({
        msg: 'Resource add',
        eventLast,
    });
};


export const resourceDelete = async (req, res) => {
    const { id } = req.params;
    const { resourceId } = req.body;

    const event = await Event.findById(id);


    event.resources = event.resources.filter(resource => resource.toString() !== resourceId);

    await event.save();

    return res.status(200).json({
        message: "Recurso eliminado exitosamente",
        event
    });
}

