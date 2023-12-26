import { _CATEGORY_SOFTDELETE, _RESTORE_PRODUCT } from "../../apis";
import { patchData } from "../../apis/api.service";

export class TrashService {
  async retoreProduct(id: number) {
    try {
      const restore = {
        isDelete: "false",
      };
      return await patchData(_RESTORE_PRODUCT, id, restore);
    } catch (error) {
      throw error;
    }
  }
  async retoreCategory(id: number) {
    try {
      const restore = {
        isDelete: "false",
      };
      return await patchData(_CATEGORY_SOFTDELETE, id, restore);
    } catch (error) {
      throw error;
    }
  }
}
