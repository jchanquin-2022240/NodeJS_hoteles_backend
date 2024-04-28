import  { response, request } from 'express';
import Event from './event.js'
import Resource from '../resource/resource.js';

export const eventsPost = async (req, res) => {

    const { nameEvent, descriptionEvent, date, typeEvent, resources, additionalServices, startTime, endingTime } = req.body;

    const updatedResources = [];


    if (resources && Array.isArray(resources)) {
        for (const resource of resources) {



            let existingResource = await Resource.findOne({ nameResource: resource.nameResource });
            let extraMount = 50;


            if (existingResource) {

                const existingResources = await Resource.find({ nameResource: resource.nameResource });


                let versionNumber = 1;

                if (existingResources.length > 0) {
                    existingResources.forEach(existingResource => {
                        const versionSplit = existingResource.versionResource.split("v");
                        if (versionSplit.length === 2) {
                            const currentVersion = parseInt(versionSplit[1]);
                            if (!isNaN(currentVersion) && currentVersion >= versionNumber) {
                                versionNumber = currentVersion + 1;
                            }
                        }
                    });
                }
                
                const newResource = new Resource({
                    nameResource: resource.nameResource,
                    amount: resource.amount,
                    price: `Q${(resource.price * resource.amount + extraMount).toFixed(2)}`,
                    versionResource: `v${versionNumber}`,
                });
                await newResource.save();
                updatedResources.push(newResource);

            } else {

                existingResource = new Resource(resource);
                existingResource.price = `Q${(resource.price * resource.amount + extraMount).toFixed(2)}`;
                existingResource.versionResource = "v1";
                await existingResource.save();

                updatedResources.push(existingResource);
            }
        }
    }


    const eventDate = new Date(date);

  

    const event = new Event({
        nameEvent,
        descriptionEvent,
        date: eventDate,
        typeEvent,
        resources: updatedResources,
        additionalServices,
        startTime,
        endingTime
    });

    await event.save();

    res.status(200).json({
        event
    })

}

export const eventPut = async (req, res) => {
    const { _id, state, resources, nameEventUpdate ,...resto } = req.body;

    let updatedResources = [];

    const event = await Event.findOne({  nameEvent: nameEventUpdate })

    const eventLast = await Event.findByIdAndUpdate(event._id, resto)

    const eventAfter = req.body;

    Object.assign(event, resto);
    await event.save();

    if(resources && Array.isArray(resources)){

        for (const resource of resources) {

            
            const existingResources = await Resource.find({ nameResource: resource.nameResourceUpdate, versionResource: resource.versionResourceUpdate});
            
            if (existingResources.length > 0) {
                for (const existingResource of existingResources) {

                    if (existingResource.versionResource === resource.versionResourceUpdate) {

                        existingResource.nameResource = resource.nameResource || existingResource.nameResource;

                        existingResource.amount = resource.amount || existingResource.amount;

                        const extraMount = 50;

                        existingResource.price = `Q${(resource.price * resource.amount + extraMount).toFixed(2)}`;

                        await existingResource.save();

                        updatedResources.push(existingResource);
                    }
                }
            }
        
        }   
    }


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

export const getEventForName = async(req, res) =>{
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

export const resourcesAddPost  = async (req, res) => {

    const { nameEvent, resources } = req.body;

    const event = await Event.findOne({ nameEvent: nameEvent})

    if (resources && Array.isArray(resources)) {
        for (const resource of resources) {



            let existingResource = await Resource.findOne({ nameResource: resource.nameResource });
            let extraMount = 50;


            if (existingResource) {

                const existingResources = await Resource.find({ nameResource: resource.nameResource });


                let versionNumber = 1;

                if (existingResources.length > 0) {
                    existingResources.forEach(existingResource => {
                        const versionSplit = existingResource.versionResource.split("v");
                        if (versionSplit.length === 2) {
                            const currentVersion = parseInt(versionSplit[1]);
                            if (!isNaN(currentVersion) && currentVersion >= versionNumber) {
                                versionNumber = currentVersion + 1;
                            }
                        }
                    });
                }
                
                const newResource = new Resource({
                    nameResource: resource.nameResource,
                    amount: resource.amount,
                    price: `Q${(resource.price * resource.amount + extraMount).toFixed(2)}`,
                    versionResource: `v${versionNumber}`,
                });
                await newResource.save();
                updatedResources.push(newResource);

            } else {

                existingResource = new Resource(resource);
                existingResource.price = `Q${(resource.price * resource.amount + extraMount).toFixed(2)}`;
                existingResource.versionResource = "v1";
                await existingResource.save();

                updatedResources.push(existingResource);
            }
        }
    }

    event.resource = existingResource;

    await event.save();

    res.status(200).json({
        msg: 'Resource add',
        event,
    })

}

export const additionalServicesPost  = async (req, res) => {

    const { nameEvent , additionalServices } = req.body;

    const event = await Event.findOne({ nameEvent: nameEvent});

    event.additionalServices = event.additionalServices.concat(additionalServices);

    await event.save();

    res.status(200).json({
        msg: 'Addional Services add',
        event
    })
}

export const resourceDelete = async (req, res ) => {

    const { eventId, resourceId } = req.body;

    const event = await Event.findById(eventId);

    event.resource = event.resource.filter(resource => resource.toString() !== resourceId);

    await event.save();

    return res.status(200).json({ 
        message: "Recurso eliminado exitosamente", 
        event   
    });
}

export const additionalServiceDeletePost = async (req, res) => {
    const { eventId, serviceName } = req.body;

        const event = await Event.findById(eventId);

        event.additionalServices = event.additionalServices.filter(service => service !== serviceName);

        await event.save();

        return res.status(200).json({
            message: "Servicio adicional eliminado exitosamente", 
            event 
        });
     
}