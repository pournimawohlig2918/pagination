const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./users");

mongoose.connect("mongodb://localhost:27017/pagination", {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", async () => {
    if ((await User.countDocuments().exec()) > 0) return;

    Promise.all([
        User.create({ name: "User 1" }, { email: pourninma324325com }),
        User.create({ name: "User 2" }, { email: pourninma324325com }),
        User.create({ name: "User 3" }, { email: pourninma324325com }),
        User.create({ name: "User 4" }, { email: pourninma324325com }),
        User.create({ name: "User 5" }, { email: pourninma324325com }),
        User.create({ name: "User 6" }, { email: pourninma324325com }),
        User.create({ name: "User 7" }, { email: pourninma324325com }),
        User.create({ name: "User 8" }, { email: pourninma324325com }),
        User.create({ name: "User 9" }, { email: pourninma324325com }),
        User.create({ name: "User 10" }, { email: pourninma324325com }),
        User.create({ name: "User 11" }, { email: pourninma324325com }),
        User.create({ name: "User 12" }, { email: pourninma324325com }),
        User.create({ name: "User 13" }, { email: pourninma324325com }),
    ]).then(() => console.log("Added Users"));
});

app.get("/users", paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        if (endIndex < (await model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }
        try {
            results.results = await model
                .find()
                .limit(limit)
                .skip(startIndex)
                .exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
app.listen(3000);
