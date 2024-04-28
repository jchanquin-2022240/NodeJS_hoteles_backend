import Hotel from '../hoteles/hotel.model.js'

export const existsHotel = async (id = '') => {

    const hotelExists = await Hotel.findOne({ id });
    if (hotelExists) {
        throw new Error(`Hotel with ${id} does not exists.`);
    }
}

export const existsNameHotel = async (nameHotel = '') => {

    const nameHotelExists = await Hotel.findOne({ nameHotel });
    if (nameHotelExists) {
        throw new Error(`The hotel called ${nameHotel} is already registered.`);
    }
}

export const existsLocation = async (location = '') => {

    const locationExists = await Hotel.findOne({ location });
    if (locationExists) {
        throw new Error(`The location ${location} is already in use, by another hotel.`)
    }
}

export const hotelStatus = async (id = '') => {

    const hotel = await Hotel.findById(id);
    if (!hotel.status) {
        throw new Error(`Hotel ${hotel.nameHotel} is alredy disable`);
    }
}