import Event from "../events/event.js";

export const existingNameEvent = async(nameEvent = '') => {
    const existingNameEventXD = await Event.findOne({ nameEvent: nameEvent});
    if(existingNameEventXD) {
        throw new Error (`The name event ${nameEvent} does exist in the database`);
    }
}