const { Router } = require("express");
const dairyRouter = Router();
const { getDairy, getDetails } = require("../controllers/control");

dairyRouter.get("/", getDairy);
dairyRouter.get("/:item", getDetails);

module.exports = dairyRouter;
