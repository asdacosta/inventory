const { Router } = require("express");
const meatRouter = Router();
const { getMeat, getDetails } = require("../controllers/control");

meatRouter.get("/", getMeat);
meatRouter.get("/:item", getDetails);

module.exports = meatRouter;
