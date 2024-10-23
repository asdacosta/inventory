const express = require("express");
const app = express();
const path = require("node:path");
app.use(express.urlencoded({ extended: true }));
const {
  getCategories,
  getAddItem,
  postItem,
  updateItem,
  getUpdateItem,
  deleteItem,
} = require("./controllers/control");
const dairyRouter = require("./routes/dairyRouter");
const fruitsRouter = require("./routes/fruitsRouter");
const meatRouter = require("./routes/meatRouter");
const vegetablesRouter = require("./routes/vegetablesRouter");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", getCategories);
app.get("/:category/addItem", getAddItem);
app.post("/:category/addItem", postItem);
app.get("/:category/:item/updateItem", getUpdateItem);
app.post("/:category/:item/updateItem", updateItem);
app.post("/:category/:item/deleteItem", deleteItem);

app.use("/fruits", fruitsRouter);
app.use("/vegetables", vegetablesRouter);
app.use("/dairy", dairyRouter);
app.use("/meatandpoultry", meatRouter);
app.use("/meat", meatRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing.`);
});
