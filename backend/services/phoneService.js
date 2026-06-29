
export const fetchAllPhones = async () => {
    const ress = await Phone.find({});
    res.json(ress);
}

export const createPhone = async (token) => {
    const user = mongoose.Types.ObjectId(req.body.tok);
    const name = req.body.devname;
    const {
        photo,
        network,
        launch,
        dimensions,
        sims,
        size,
        display,
        resolution,
        os,
        chipset,
        frontcamera,
        backcamera,
        video,
        storage,
        cpu,
        gpu,
        battery,
        colors,
        username
    } = req.body;
    const device = await Phone.findOne({ name });
    if (device) {
        res.json({ err: "Device Already Exixts" });
    }
    else {
        const phonee = new Phone({
            user,
            photo,
            name,
            network,
            launch,
            dimensions,
            sims,
            size,
            display,
            resolution,
            os,
            chipset,
            frontcamera,
            backcamera,
            video,
            storage,
            cpu,
            gpu,
            battery,
            colors,
            username
        });
        const ph = await phonee.save();
        res.json({ msg: "Done" });
    }
};

router.post("/update", async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.body._id);
        const {
            photo,
            name,
            network,
            launch,
            dimensions,
            sims,
            size,
            display,
            resolution,
            os,
            chipset,
            frontcamera,
            backcamera,
            video,
            storage,
            cpu,
            gpu,
            battery,
            colors
        } = req.body;
        const update = {
            photo,
            name,
            network,
            launch,
            dimensions,
            sims,
            size,
            display,
            resolution,
            os,
            chipset,
            frontcamera,
            backcamera,
            video,
            storage,
            cpu,
            gpu,
            battery,
            colors
        }
        const doc = await Phone.findOneAndUpdate({ _id }, update, { new: true });
        res.json(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post("/deletedevice", async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.body._id);
        await Phone.deleteOne({ _id });
        res.json({ result: "successfully Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});