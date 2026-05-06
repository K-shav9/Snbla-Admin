import { combineReducers } from "redux";
// import ToDo from "./SelectorAndTests/reducer";
import Auth from "./Auth/user";
import General from "./general";
import Merchant from "./Auth/merchant"
import Payment from "./Auth/payment"

export default combineReducers({
  // ToDo,
  Auth,
  General,
  Merchant,
  Payment
});
