import { INTERNET_STATUS } from "../../navigation/AppNavigator";
const initialState = {
  internetStatus:null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case INTERNET_STATUS: {
     
      return { internetStatus:action.netStatus };
    }
    default:
      return state;
  }
};
