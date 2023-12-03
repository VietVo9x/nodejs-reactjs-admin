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
import { Res_Category } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { _CATEGORY } from "../../apis";
import { F_Product } from "../../types/form.type";
import { Err_Req_Product } from "../../types/error.request";
import { ProductServices } from "./products.service";
import { ToastContainer, toast } from "react-toastify";
import { Res_Error } from "../../types/error.response";

interface Props {
  onShowForm: boolean;
  onCloseForm: Function;
  errorForm: Err_Req_Product | undefined;
  setErrorForm: Function;
  newProduct: F_Product;
  setNewProduct: Function;
}
export default function CreateProduct(props: Props) {
  const productService = new ProductServices();
  const [categorys, setCategorys] = useState<Res_Category[]>([]);
  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    props.setNewProduct({ ...props.newProduct, [name]: value } as F_Product);
  };
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      props.setNewProduct((prevState: F_Product) => ({ ...prevState, fileInput: fileList }));
    }
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
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const validator = productService.validator(props.newProduct);
      if (validator.isError) {
        props.setErrorForm(validator);
        return;
      }
      props.setErrorForm(validator);
      const insertProduct = await productService.createProduct(props.newProduct);
      if (insertProduct) {
        toast.success("Added product successfully", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const newError = error as Res_Error;
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };
  //categorys name
  useEffect(() => {
    getData(_CATEGORY).then((res) => {
      setCategorys(res?.data);
    });
  }, []);
  useEffect(() => {
    if (props.newProduct) {
      props.setNewProduct(props.newProduct);
    }
  }, [props.newProduct]);
  return (
    <div>
      {/* modal */}
      <ToastContainer />
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
                    margin="normal"
                    required
                    id="productName"
                    name="product_name"
                    label="Product Name"
                    fullWidth
                    value={props.newProduct.product_name}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgProductName)}
                    helperText={props.errorForm?.msgProductName}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="sku"
                    label="SKU"
                    name="sku"
                    fullWidth
                    value={props.newProduct.sku}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgSku)}
                    helperText={props.errorForm?.msgSku}
                  />
                </Box>
                <Box display={"flex"} gap={2} alignItems={"baseline"}>
                  <TextField
                    margin="normal"
                    required
                    id="stock_quantity"
                    name="quantity_stock"
                    label="Quantity Stock"
                    fullWidth
                    value={props.newProduct.quantity_stock}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgQuantityStock)}
                    helperText={props.errorForm?.msgQuantityStock}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      id="demo-simple-select-label"
                      name="category_id"
                      label="category"
                      onChange={handleFormChange}
                      value={props.newProduct.category_id}
                    >
                      {categorys.length > 0 &&
                        categorys.map((category, index) => (
                          <MenuItem value={category.id} key={index}>
                            {category.category_name}
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
                    margin="normal"
                    required
                    id="unitPrice"
                    name="price"
                    label="Price"
                    fullWidth
                    value={props.newProduct.price}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgPrice)}
                    helperText={props.errorForm?.msgPrice}
                  />
                </Box>
                <Box display={"flex"} gap={2}>
                  <TextField
                    margin="normal"
                    required
                    id="description"
                    label="Description"
                    name="description"
                    fullWidth
                    value={props.newProduct?.description}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgDescription)}
                    helperText={props.errorForm?.msgDescription}
                  />
                </Box>
                <div>
                  <Input
                    type="file"
                    inputProps={{ multiple: true }}
                    onChange={(e) => handleFileChange(e)}
                  />

                  <Stack direction="row" spacing={2}>
                    {props.newProduct?.fileInput?.map((file: File, index: number) => (
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
                  <FormHelperText style={{ color: "red" }}>
                    {props.errorForm?.msgImage}
                  </FormHelperText>
                </div>

                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SendIcon />}
                    sx={{ mt: 3, mb: 2 }}
                    color="success"
                    onClick={handleSubmit}
                  >
                    Create Product
                  </Button>

                  <Button
                    variant="contained"
                    type="button"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => props.onCloseForm("create")}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </div>
  );
}
