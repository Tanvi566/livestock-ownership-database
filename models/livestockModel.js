const db = require("../db");

exports.addFarmer = (data, cb) => {
    db.query("INSERT INTO farmers SET ?", data, cb);
};

exports.addLivestock = (data, cb) => {
    db.query("INSERT INTO livestock SET ?", data, cb);
};

exports.getLivestock = (cb) => {
    db.query("SELECT * FROM livestock", cb);
};

exports.deleteLivestock = (id, cb) => {
    db.query("DELETE FROM livestock WHERE id=?", [id], cb);
};

exports.updateLivestock = (id, data, cb) => {
    db.query("UPDATE livestock SET ? WHERE id=?", [data, id], cb);
};

exports.searchLivestock = (owner, type, cb) => {
    let query = "SELECT * FROM livestock WHERE 1=1";
    let params = [];

    if (owner) {
        query += " AND owner LIKE ?";
        params.push(`%${owner}%`);
    }

    if (type) {
        query += " AND animal_type=?";
        params.push(type);
    }

    db.query(query, params, cb);
};