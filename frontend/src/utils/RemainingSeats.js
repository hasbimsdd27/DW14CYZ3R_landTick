import { API } from "../config/api";

const RemainingSeats = async (id_train, departureDate) => {
  try {
    const res = await API.get(`/remainingseats/${id_train}/${departureDate}`);
    return `${res.data.available_seat} Seats Remaining`;
  } catch (err) {
    console.log(err);
  }
  console.log(id_train, departureDate);
};

export default RemainingSeats;
