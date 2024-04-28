import Event from "../events/event.js";

export const existingNameEvent = async(nameEvent = '') => {
    const existingNameEvent = await Event.findOne({ nameEvent});
    if(existingNameEvent) {
        throw new Error (`The name event ${nameEvent} does exist in the database`);
    }
}