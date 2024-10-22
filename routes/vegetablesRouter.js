const { Router } = require("express");
const vegetablesRouter = Router();
const { getVegetables, getDetails } = require("../controllers/control");

vegetablesRouter.get("/", getVegetables);
vegetablesRouter.get("/:item", getDetails);

module.exports = vegetablesRouter;
