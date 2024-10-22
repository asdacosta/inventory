const db = require("../db/queries");

async function getCategories(req, res) {
  const items = await db.selectData("categories");
  res.render("index", { items: items, categories: true, type: "categories" });
}

async function getFruits(req, res) {
  const items = await db.selectData("fruits");
  res.render("index", { items: items, categories: false, type: "fruits" });
}

async function getVegetables(req, res) {
  const items = await db.selectData("vegetables");
  res.render("index", { items: items, categories: false, type: "vegetables" });
}

async function getDairy(req, res) {
  const items = await db.selectData("dairy");
  res.render("index", { items: items, categories: false, type: "dairy" });
}

async function getMeat(req, res) {
  const items = await db.selectData("meat");
  res.render("index", { items: items, categories: false, type: "meat" });
}

async function getDetails(req, res) {
  let item = req.params.item;
  item = item.charAt(0).toUpperCase() + item.slice(1);
  const items = await db.selectDetails(item);
  console.log("These item: ", item);
  res.render("item", { items: items });
}

async function getAddItem(req, res) {
  const category = req.params.category;
  res.render("addItem", { category: category });
}

async function postItem(req, res) {
  const { itemName, url, quantity, price } = req.body;
  let formatName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
  const category = req.params.category;
  const categoryItems = await db.selectItems(category);

  for (const item of categoryItems) {
    if (item.name.toLowerCase() === itemName.toLowerCase()) {
      return res.render("addItem", { category: category });
    }
  }
  const items = await db.insertItem(category, formatName, url, price, quantity);
  res.redirect(`/${category}`);
}

module.exports = {
  getCategories,
  getFruits,
  getVegetables,
  getDairy,
  getMeat,
  getDetails,
  getAddItem,
  postItem,
};
