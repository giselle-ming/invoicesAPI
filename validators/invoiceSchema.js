module.exports = function validateInvoice(inv) {
  const errors = [];
  if (!inv) {
    errors.push("invoice object required");
    return { valid: false, errors };
  }

  // Validate vendor object
  if (!inv.vendor) errors.push("vendor object is required");
  else if (!inv.vendor.name) errors.push("vendor.name is required");

  // Validate billing object
  if (!inv.billing) errors.push("billing object is required");
  else if (!inv.billing.address) errors.push("billing.address is required");

  // Validate shipping object
  if (!inv.shipping) errors.push("shipping object is required");
  else if (!inv.shipping.address) errors.push("shipping.address is required");

  // Validate invoice object
  if (!inv.invoice) errors.push("invoice object is required");
  else {
    if (!inv.invoice.number) errors.push("invoice.number is required");
    if (!inv.invoice.date) errors.push("invoice.date is required");
    if (inv.invoice.total_amount == null)
      errors.push("invoice.total_amount is required");
  }

  // Validate bank object (optional, but if present, validate structure)
  if (inv.bank && typeof inv.bank !== "object")
    errors.push("bank must be an object");

  // Validate items array
  if (!Array.isArray(inv.items) || inv.items.length === 0)
    errors.push("items must be a non-empty array");
  else {
    inv.items.forEach((it, idx) => {
      if (!it.description) errors.push(`items[${idx}].description is required`);
      if (it.quantity == null)
        errors.push(`items[${idx}].quantity is required`);
      if (it.unit_price == null)
        errors.push(`items[${idx}].unit_price is required`);
    });
  }

  return { valid: errors.length === 0, errors };
};
