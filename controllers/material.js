import Material from "../models/Material.js";

export const getAll = async (req, res) => {
    try {
        const response = await Material.find().sort({ daysLeft: 1 })
        res.status(201).json(response);
    } catch (error) {
        res.status(409).json({ msg: err.message });
    }
}

export const getInven = async (req, res) => {
    try {
        const response = await Material.find()
        res.status(201).json(response);
    } catch (error) {
        res.status(409).json({ msg: err.message });
    }
}

export const sendone = async (req, res) => {
    try {
        const { id } = req.params;
        const { avgConsumption, reqForThreeMonths, actualReqForThree, stockInHand, daysLeft } = req.body;
        const response = await Material.updateOne({ _id: id }, { $set: { avgConsumption: avgConsumption, reqForThreeMonths: reqForThreeMonths, actualReqForThree: actualReqForThree, stockInHand: stockInHand, daysLeft: daysLeft } })
        res.status(201).json(response);
    } catch (error) {
        res.status(409).json({ msg: err.message });
    }
}

export const sendAll = async (req, res) => {
    try {
        if ((await Material.find()).length != 0) {
            const result = await Material.deleteMany();
            if (result.acknowledged) {
                const { materials } = req.body;
                for (let i = 0; i < materials.length; i++) {
                    const newMaterial = new Material({
                        materialCode: materials[i]['Material No'],
                        avgConsumption: materials[i]['Avg Consumption per annum'],
                        reqForThreeMonths: materials[i]['Requirement for 3 Months in MT'],
                        actualReqForThree: materials[i]['Requirement for 3 Months in MT_1'],
                        stockInHand: materials[i]['Stock in hand in MT'],
                        daysLeft: materials[i]["Coverage in days"]
                    })

                    await newMaterial.save();
                }
            }
        } else {
            const { materials } = req.body;
            for (let i = 0; i < materials.length; i++) {
                const newMaterial = new Material({
                    materialCode: materials[i]['Material No'],
                    avgConsumption: materials[i]['Avg Consumption per annum'],
                    reqForThreeMonths: materials[i]['Requirement for 3 Months in MT'],
                    actualReqForThree: materials[i]['Requirement for 3 Months in MT_1'],
                    stockInHand: materials[i]['Stock in hand in MT'],
                    daysLeft: materials[i]["Coverage in days"]
                })

                await newMaterial.save();
            }
        }
        const response = await Material.find()
        res.status(201).json(response);
    } catch (err) {
        res.status(409).json({ msg: err.message });
    }
}

export const individual = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Material.find({ _id: id });
        res.status(201).json(item);
    } catch (err) {
        res.status(409).json({ msg: err.message });
    }
}