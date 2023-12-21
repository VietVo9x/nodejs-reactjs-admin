import SendIcon from "@mui/icons-material/Send";
import { ReactHTMLElement, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";

import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material/";
import { Category_Res, Image_Res, Product_Res } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { _CATEGORY } from "../../apis";
import { Err_Req_Product } from "../../types/error.request";
import { ProductServices } from "./products.service";
import ImageList from "./ImageList";
import { F_Product_Update } from "../../types/form.type";
import { toast } from "react-toastify";
import { Res_Error } from "../../types/error.response";
import UpdateImgages from "./update.images-product";
import { displayError } from "../../utils/common/display-error";

interface Props {
  onShowForm: boolean;
  onCloseForm: Function;
  errorForm: Err_Req_Product | undefined;
  product: any;
  setProduct: Function;
  flag: boolean;
  setFlag: Function;
}
export default function UpdateProduct(props: Props) {
  const [categorys, setCategorys] = useState<Category_Res[]>([]);
  const [images, setImages] = useState<Image_Res[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [toggleChangeImage, setToggleChangeImage] = useState(false);

  const handleFormChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    props.setProduct({
      ...props.product,
      [name]: value,
    });
  };
  const productService = new ProductServices();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData: F_Product_Update = {
        product_name: props.product.product_name,
        price: props.product.price,
        quantity_stock: props.product.quantity_stock,
        description: props.product.description,
        categoryId: props.product.categoryId,
        fileInput: newImages,
      };
      await productService.editProduct(formData, props.product?.id as number);

      toast.success("Product updated successfully", {
        autoClose: 1000,
      });
      props.setFlag(!props.flag);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    if (props.product) {
      const formattedImages: Image_Res[] = props.product?.images.map((image: Image_Res) => ({
        imageUrl: image.imageUrl,
      }));
      setImages(formattedImages);
    }
  }, [props.product]);
  //categorys name
  useEffect(() => {
    getData(_CATEGORY).then((res) => {
      setCategorys(res?.categories);
    });
  }, []);

  const handleEditImages = () => {
    setToggleChangeImage(true);
    setNewImages([]);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    maxHeight: "100vh",
  };

  return (
    <>
      {/* modal */}
      <Modal
        open={props.onShowForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Modal
            open={props.onShowForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="productName"
                    name="product_name"
                    label="Product Name"
                    fullWidth
                    value={props.product?.product_name}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgProductName)}
                    helperText={props.errorForm?.msgProductName}
                  />
                </Box>
                <Box display={"flex"} gap={2} alignItems={"baseline"}>
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="stock_quantity"
                    name="quantity_stock"
                    label="Quantity Stock"
                    fullWidth
                    value={props.product?.quantity_stock}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgQuantityStock)}
                    helperText={props.errorForm?.msgQuantityStock}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="Category" required>
                      Category
                    </InputLabel>
                    <Select
                      label="Category"
                      disabled={!isEditing}
                      id="demo-simple-select-label"
                      name="categoryId"
                      onChange={handleFormChange}
                      value={props.product?.categoryId}
                    >
                      {categorys.length > 0 &&
                        categorys
                          .filter((category) => category.status === true)
                          .map((category, index) => (
                            <MenuItem value={category.id} key={index}>
                              {category.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box display={"flex"} gap={2} alignItems={"baseline"}>
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="unitPrice"
                    name="price"
                    label="Price"
                    fullWidth
                    value={props.product?.price}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgPrice)}
                    helperText={props.errorForm?.msgPrice}
                  />
                  {/* <FormControl fullWidth disabled={!isEditing}>
                    <Select
                      id="demo-simple-select-label"
                      name="brand_id"
                      // onChange={handleSelectChange}
                      value={"brand"}
                    >
                      {categorys.length > 0 &&
                        categorys
                          .filter((category) => category.status === true)
                          .map((category, index) => (
                            <MenuItem value={category.id} key={index}>
                              {category.name}
                            </MenuItem>
                          ))}
                    </Select>

                    <FormHelperText style={{ color: "red" }}>
                      {props.errorForm?.msgCategory}
                    </FormHelperText>
                  </FormControl> */}
                </Box>
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    minRows={5}
                    maxRows={10}
                    fullWidth
                    value={props.product?.description}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgDescription)}
                    helperText={props.errorForm?.msgDescription}
                  />
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {!toggleChangeImage ? (
                    <ImageList images={images} />
                  ) : (
                    <UpdateImgages setNewImages={setNewImages} newImages={newImages} />
                  )}
                </div>
                {isEditing && <Button onClick={handleEditImages}>Update new images</Button>}

                <Box display={"flex"} justifyContent={"space-between"}>
                  {isEditing ? (
                    <Button
                      variant="contained"
                      type="button"
                      startIcon={<SendIcon />}
                      sx={{ mt: 3, mb: 2 }}
                      color="success"
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      type="button"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      props.onCloseForm("update");
                      setIsEditing(false);
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
}
