import { item } from "../Redux/Slices/cartSlice";

export default function getLSData() {
  const items = JSON.parse(localStorage.getItem("cart") as string) as item[];
  const totalPrice = JSON.parse(
    localStorage.getItem("price") as string
  ) as number;
  const totalCount = JSON.parse(
    localStorage.getItem("count") as string
  ) as number;
  return {
    items,
    totalPrice,
    totalCount,
  };
}
