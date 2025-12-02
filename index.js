const express = require("express");
const cors = require("cors");
const invoicesRouter = require("./routes/invoices");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/invoices", invoicesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Invoice API listening on port ${PORT}`);
});
