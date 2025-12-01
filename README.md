# RPA Invoice API

Simple Node/Express API to POST and GET invoice information.

Quick start

1. Install dependencies

```bash
cd "/Users/giselle/Documents/College Projects/RPAapi"
npm install
```

2. Run the server

```bash
npm start
# or in development
npm run dev
```

3. Examples

Create an invoice (minimal required fields):

```bash
curl -X POST http://localhost:3000/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceNumber":"INV-1001",
    "invoiceDate":"2025-12-01",
    "totalAmount":1500.5,
    "vendorName":"Acme Corp",
    "billingAddress":"123 Main St",
    "items":[{"description":"Widget","quantity":2,"unitPrice":500}]
  }'
```

Get all invoices:

```bash
curl http://localhost:3000/invoices
```

Get invoice by id:

```bash
curl http://localhost:3000/invoices/<id>
```

Notes

- Data is stored in `./data/invoices.json` (simple JSON file storage for demo).
- Validation is minimal; adapt to your full field list from your attachment as needed.
