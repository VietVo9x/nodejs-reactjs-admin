import { _ORDER } from "../../apis";
import { patchData } from "../../apis/api.service";

class OrderService {
  async confirmOrder(id: number) {
    try {
      const updateStatus = {
        status: "true",
      };
      return await patchData(_ORDER, id, updateStatus);
    } catch (error) {
      throw error;
    }
  }
}
export default OrderService;
