const { Router } = require("express");
const fruitsRouter = Router();

const { getFruits, getDetails } = require("../controllers/control");

fruitsRouter.get("/", getFruits);
fruitsRouter.get("/:item", getDetails);

module.exports = fruitsRouter;
