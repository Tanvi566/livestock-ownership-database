const model = require("../models/livestockModel");

/* LOGIN */
exports.login = (req, res) => {
    const { username, password, role } = req.body;

    if (role === "admin" && username === "admin" && password === "admin") {
        return res.json({ success: true });
    }

    if (role === "farmer" && username === "farmer" && password === "farmer") {
        return res.json({ success: true });
    }

    res.json({ success: false });
};

/* CRUD */
exports.addFarmer = (req, res) => {
    model.addFarmer(req.body, err => {
        if (err) return res.status(500).send(err);
        res.send("Farmer Added");
    });
};

exports.addLivestock = (req, res) => {
    model.addLivestock(req.body, err => {
        if (err) return res.status(500).send(err);
        res.send("Livestock Added");
    });
};

exports.getLivestock = (req, res) => {
    model.getLivestock((err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });
};

exports.deleteLivestock = (req, res) => {
    model.deleteLivestock(req.params.id, err => {
        if (err) return res.status(500).send(err);
        res.send("Deleted");
    });
};

exports.updateLivestock = (req, res) => {
    model.updateLivestock(req.params.id, req.body, err => {
        if (err) return res.status(500).send(err);
        res.send("Updated");
    });
};

exports.searchLivestock = (req, res) => {
    const { owner, type } = req.query;

    model.searchLivestock(owner, type, (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });
};