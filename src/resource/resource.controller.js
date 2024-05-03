
import Resource from "./resource.js";

export const resourcePost = async (req, res) => {
    const { namePackage, description, price } = req.body;
    const resource = new Resource({ namePackage, description, price });

    await resource.save();

    res.status(200).json({ msg: "Resource created successfully" });
}

//get
export const resourceGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true }

    const [total, resources] = await Promise.all([
        Resource.countDocuments(query),
        Resource.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({ total, resources });
}

//put
export const resourcePut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    await Resource.findByIdAndUpdate(id, rest);

    const resource = await Resource.findOne({ _id: id });

    res.status(200).json({ msg: "Resource updated successfully", resource })
}

///delete
