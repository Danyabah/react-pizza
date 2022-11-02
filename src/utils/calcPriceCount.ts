import { RootState } from "../Redux/store";

export default function calculatePriceAndCount(state: RootState["cart"]) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
  state.totalCount = state.items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}
