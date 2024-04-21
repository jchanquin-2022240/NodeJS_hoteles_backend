import { response, request } from 'express';
import Event from './event.js'
import Resource from '../resource/resource.js';

export const eventsPost = async (req, res) => {
    
    const { nameEvent, descriptionEvent, date, typeEvent,  resources, additionalServices } = req.body;

    const updatedResources  = [];

    
    if (resources && Array.isArray(resources)) {
        for (const resource of resources) {
            let existingResource = await Resource.findOne({ nameResource: resource.nameResource });
            let extraMount = 50;


            if (existingResource) {

                const version = existingResource.versionResource ? parseInt(existingResource.versionResource.split("v")[1]) + 1 : 1;

                const newResource = new Resource({
                    nameResource: resource.nameResource,
                    amount: resource.amount,
                    price: (resource.price * resource.amount) + extraMount,
                    versionResource: `v${version}`,
                });
                await newResource.save();
                updatedResources.push(newResource);
                
            } else {

                existingResource = new Resource(resource);
                existingResource.price = (existingResource.price * existingResource.amount) + extraMount;
                await existingResource.save();
                
                updatedResources.push(existingResource);
            }
        }
    }
    const event = new Event({
        nameEvent,
        descriptionEvent,
        date,
        typeEvent,
        resources: updatedResources , 
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