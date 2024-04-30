import Resource from "./resource.js";

export const resourcePost = async (req, res) => {
    const { namePackage, description, price} = req.body;
    const resource = new Resource({ namePackage, description, price });
    
    await resource.save();

    res.status(200).json({ msg: "Resource created successfully" });
}

//get
export const resourceGet = async (req, res) => {
    const query = {state: true}

    const [total, resources] = await Promise.all([
        Resouce.countDocuments(query),
        Resource.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({ total, resources});
}

//put


///delete
