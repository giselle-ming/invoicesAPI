module.exports = function validateInvoice(inv) {
  const errors = [];
  if (!inv) {
    errors.push("invoice object required");
    return { valid: false, errors };
  }
  if (!inv.invoiceNumber) errors.push("invoiceNumber is required");
  if (!inv.invoiceDate) errors.push("invoiceDate is required");
  if (inv.totalAmount == null) errors.push("totalAmount is required");
  if (!inv.vendorName) errors.push("vendorName is required");
  if (!inv.billingAddress) errors.push("billingAddress is required");
  if (!Array.isArray(inv.items) || inv.items.length === 0)
    errors.push("items must be a non-empty array");
  else {
    inv.items.forEach((it, idx) => {
      if (!it.description) errors.push(`items[${idx}].description is required`);
      if (it.quantity == null)
        errors.push(`items[${idx}].quantity is required`);
      if (it.unitPrice == null)
        errors.push(`items[${idx}].unitPrice is required`);
    });
  }
  return { valid: errors.length === 0, errors };
};
