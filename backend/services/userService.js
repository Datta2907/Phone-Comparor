const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const Phone = require('../models/Phone');
const Report = require('../models/reportuser');

exports.fetchAllPhones = async () => {
    const ress = await Phone.find({});
    res.json(ress);
}

router.get('/allcomplaints', async (req, res) => {
    try {
        const ress = await Report.find({});
        res.json(ress);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'server error' });
    }
});

router.get('/allusers', async (req, res) => {
    try {
        const ress = await User.find({});
        res.json(ress);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'server eroor' });
    }
})

router.post("/add", async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

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

router.post('/reportdevice', async (req, res) => {
    try {
        const rip = await Phone.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
        rip.reports.push({
            user: mongoose.Types.ObjectId(req.body.token),
            description: req.body.x,
            status: 'Pending',
            name: req.body.name,
            phname: req.body.proname
        });
        await rip.save();
        res.json({ msg: "Added a Report" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post('/reportuser', async (req, res) => {
    try {
        const report = new Report({
            description: req.body.x,
            status: 'Pending',
            name: req.body.name,
            fraudname: req.body.username
        });
        await report.save();
        res.json({ msg: "Added a Report" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post('/reportstatus', async (req, res) => {
    try {
        const ress = await Report.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
        if (ress) {
            ress.status = req.body.status;
        }
        await ress.save();
        res.json({ msg: "Updated Report Status" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post("/getreports", async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.body._id);
        const rip = await Phone.findOne({ _id });
        return res.json(rip);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
})

router.post('/updatestatus', async (req, res) => {
    try {
        const rip = await Phone.find({ _id: mongoose.Types.ObjectId(req.body._id) });
        const repid = mongoose.Types.ObjectId(req.body.reportid);
        const typee = req.body.type;
        rip[0].reports.forEach((pro) => {
            if (pro._id.equals(repid)) {
                if (typee === 'reject') {
                    pro.status = 'Rejected';
                }
                else {
                    pro.status = "Resolved";
                }
            }
        });
        await rip[0].save();
        res.json({ msg: "Done" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post('/deletereport', async (req, res) => {
    try {
        const rip = await Phone.find({ _id: mongoose.Types.ObjectId(req.body.phoneid) });
        var removeIndex = rip[0].reports.map((item) => { return item._id; }).indexOf(mongoose.Types.ObjectId(req.body.reportid));
        rip[0].reports.splice(removeIndex, 1);
        await rip[0].save();
        res.json({ msg: "Done" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post('/deleteuser', async (req, res) => {
    try {
        console.log(req.body._id);
        const ress = await User.findByIdAndDelete({ _id: mongoose.Types.ObjectId(req.body._id) });
        const res1 = await Phone.findOneAndDelete({ user: mongoose.Types.ObjectId(req.body._id) });
        const res2 = await Report.findOneAndDelete({ name: req.body.name });
        res.json({ msg: 'Done' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
})

router.post('/deleteuserreport', async (req, res) => {
    try {
        const rip = await Report.findByIdAndDelete({ _id: mongoose.Types.ObjectId(req.body._id) });
        res.json({ msg: "Done" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

router.post("/settings/profile", async (req, res) => {
    try {
        const {
            id,
            oldpass,
            password
        } = req.body;
        const update = {
            password
        };
        const result = await User.findOne({ _id: id });
        if (result.password === oldpass) {
            const ress = await User.findOneAndUpdate({ _id: id }, update, { new: true });
            res.json(ress);
        }
        else {
            res.json({ err: "Old Password Doesn't Match." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: 'server error' });
    }
});

module.exports = router;