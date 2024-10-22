const pool = require("./pool");

async function selectData(table) {
  const { rows } = await pool.query(`SELECT * FROM ${table}`);
  return rows;
}

async function selectDetails(item) {
  const { rows } = await pool.query(
    `SELECT items.name, details.price, details.quantity, details.amount 
    FROM items 
    JOIN details ON items.id = details.id 
    WHERE items.name = $1 `,
    [item]
  );
  return rows;
}

async function insertItem(category, name, url, price, quantity) {
  const path = name.toLowerCase();
  let category_id = null;
  if (category === "Fruits") {
    category_id = 1;
  } else if (category === "Vegetables") {
    category_id = 2;
  } else if (category === "Dairy") {
    category_id = 3;
  } else if (category === "Meat & Poultry") {
    category_id = 4;
  }

  await pool.query(
    `INSERT INTO ${category} (name, url, path) VALUES ($1, $2, $3)`,
    [name, url, path]
  );

  await pool.query("INSERT INTO items (name, category_id) VALUES ($1, $2)", [
    name,
    category_id,
  ]);

  await pool.query("INSERT INTO details (price, quantity) VALUES ($1, $2)", [
    price,
    quantity,
  ]);
}

async function selectItems(category) {
  const { rows } = await pool.query(`SELECT name FROM ${category}`);
  return rows;
}

async function updateItem(category, name, url, price, quantity) {
  await pool.query(`UPDATE ${category} SET url = $1 WHERE name = $2`, [
    url,
    name,
  ]);

  await pool.query(
    "UPDATE details SET price = $1, quantity = $2 WHERE id = (SELECT id FROM items WHERE name = $3)",
    [price, quantity, name]
  );
}

module.exports = {
  selectData,
  insertItem,
  selectDetails,
  selectItems,
  updateItem,
};
