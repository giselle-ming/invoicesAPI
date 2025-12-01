const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const validateInvoice = require("../validators/invoiceSchema");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "invoices.json");

async function readData() {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeData(data) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

router.post("/", async (req, res) => {
  const invoice = req.body;
  const { valid, errors } = validateInvoice(invoice);
  if (!valid) return res.status(400).json({ errors });

  try {
    const data = await readData();
    const id = uuidv4();
    const record = { id, ...invoice, createdAt: new Date().toISOString() };
    data.push(record);
    await writeData(data);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save invoice" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read invoices" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await readData();
    const inv = data.find((i) => i.id === req.params.id);
    if (!inv) return res.status(404).json({ error: "Not found" });
    res.json(inv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read invoices" });
  }
});

module.exports = router;
