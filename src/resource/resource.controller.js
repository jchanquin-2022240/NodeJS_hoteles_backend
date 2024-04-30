import Resource from './resource.model';

export const resourcePost = async (req, res) => {
    const { namePackage, description, price} = req.body;

    await user.save();

    res.status(200).json({ msg: "Resource created successfully" });
}

//get
export const resourceGet = async (req, res) => {
    
}

//put


///delete
