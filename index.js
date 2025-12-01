const express = require("express");
const invoicesRouter = require("./routes/invoices");

const app = express();
app.use(express.json());

app.use("/invoices", invoicesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Invoice API listening on port ${PORT}`);
});
