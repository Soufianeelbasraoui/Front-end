
const formatPrice = (price) => {
  if (typeof price === "number") return `${price} DH`;
  if (typeof price === "string" && !price.endsWith("DH")) return `${price} DH`;
  return price;
};

export default formatPrice;
