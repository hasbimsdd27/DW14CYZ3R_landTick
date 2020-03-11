import { REMAINING_SEATS } from "../config/constants";
import { API } from "../config/api";

export const RemainingSeats = (id_train, departureDate) => {
  return {
    type: REMAINING_SEATS,
    payload: async () => {
      const res = await API.post(`/purchasedseat/${id_train}/${departureDate}`);
      console.log(res);
    }
  };
};
