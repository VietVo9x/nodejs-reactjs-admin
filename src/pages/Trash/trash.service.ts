import { _RESTORE_PRODUCT } from "../../apis";
import { patchData } from "../../apis/api.service";

export class TrashService {
  async retoreProduct(id: number) {
    console.log(id);
    try {
      const restore = {
        isDelete: "false",
      };
      return await patchData(_RESTORE_PRODUCT, id, restore);
    } catch (error) {
      throw error;
    }
  }
  retoreCategory(id: number) {}
}
