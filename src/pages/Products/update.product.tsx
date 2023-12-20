import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";

import {
  Box,
  Button,
  Card,
  CardMedia,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material/";
import { Category_Res, Res_Images } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { _CATEGORY } from "../../apis";
import { Err_Req_Product } from "../../types/error.request";
import { ProductServices } from "./products.service";
import ImageList from "./ImageList";
import { F_Product_Update } from "../../types/form.type";
import { toast } from "react-toastify";
import { Res_Error } from "../../types/error.response";

interface Props {
  onShowForm: boolean;
  onCloseForm: Function;
  errorForm: Err_Req_Product | undefined;
  product: any;
  setProduct: Function;
  toggleChangeImage: boolean;
  setToggleChangeImage: Function;
  flag: boolean;
  setFlag: Function;
}
export default function UpdateProduct(props: Props) {
  const [categorys, setCategorys] = useState<Category_Res[]>([]);
  const [images, setImages] = useState<Res_Images[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState<Res_Images[]>([]);
  const [dataSend, setDataSend] = useState<F_Product_Update>();

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;

    props.setProduct({
      ...props.product,
      [name]: value,
      category: { id: value, category_name: "" },
    });
    setDataSend({ ...props.product, [name]: value, category_id: value } as F_Product_Update);
  };
  const productService = new ProductServices();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const { sku, product_name, price, quantity_stock, description, category } =
      props.product as any;

    // Logic để lưu thông tin
    let formData;
    if (!dataSend) {
      formData = {
        sku,
        product_name,
        price,
        quantity_stock,
        description,
        category_id: category.id,
        fileInput: newImages,
      };

      await productService.editProduct(formData, props.product?.id as number);

      toast.success("Product updated successfully", {
        autoClose: 1000,
      });
    }
    try {
      // setIsEditing(false);

      if (dataSend) {
        formData = {
          sku: dataSend.sku,
          product_name: dataSend.product_name,
          price: dataSend.price,
          quantity_stock: dataSend.quantity_stock,
          description: dataSend.description,
          category_id: dataSend.category_id,
          fileInput: newImages,
        };
        await productService.editProduct(formData, props.product?.id as number);

        toast.success("Product updated successfully", {
          autoClose: 1000,
        });
        props.setFlag(!props.flag);
      }
    } catch (error) {
      const newError = error as Res_Error;
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    if (props.product) {
      const formattedImages: Res_Images[] = props.product?.imageProducts.map((image: any) => ({
        image_url: image.image_url,
      }));
      setImages(formattedImages);
    }
  }, [props.product]);
  //categorys name
  useEffect(() => {
    getData(_CATEGORY).then((res) => {
      setCategorys(res?.data);
    });
  }, []);

  const handleEditImages = () => {
    props.setToggleChangeImage(true);
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
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="sku"
                    label="SKU"
                    name="sku"
                    fullWidth
                    value={props.product?.sku}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgSku)}
                    helperText={props.errorForm?.msgSku}
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
                      name="category_name"
                      onChange={handleFormChange}
                      value={props.product?.category.id ?? ""}
                    >
                      {categorys.length > 0 &&
                        categorys
                          .filter((category) => category.status === true)
                          .map((category, index) => (
                            <MenuItem value={category.id} key={index}>
                              {category.name}
                            </MenuItem>
                          ))}
                      {(!props.product?.category.id ||
                        !categorys.some((cat) => cat.id === props.product?.category.id)) && (
                        <MenuItem value={-1}>Default Category</MenuItem>
                      )}
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
                  <FormControl fullWidth disabled={!isEditing}>
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
                  </FormControl>
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
                  {!props.toggleChangeImage ? (
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

function UpdateImgages(props: any) {
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      props.setNewImages(fileList);
    }
  };
  return (
    <div>
      <Input type="file" inputProps={{ multiple: true }} onChange={(e) => handleFileChange(e)} />

      <Stack direction="row" spacing={2}>
        {props.newImages.map((file: File, index: number) => (
          <Card key={index} sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={URL.createObjectURL(file)} // Hiển thị ảnh tạm thời từ file đã chọn
              alt={`Preview ${index}`}
              sx={{
                objectFit: "cover",
              }}
            />
          </Card>
        ))}
      </Stack>
      <FormHelperText style={{ color: "red" }}>{props.errorForm?.msgImage}</FormHelperText>
    </div>
  );
}
