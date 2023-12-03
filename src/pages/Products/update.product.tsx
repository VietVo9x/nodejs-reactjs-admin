import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
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
import { Res_Product, Res_Category, Res_Images } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { _CATEGORY } from "../../apis";
import { Err_Req_Product } from "../../types/error.request";
import { ProductServices } from "./products.service";
import ImageList from "./ImageList";
import { F_Product_Update } from "../../types/form.type";
import { toast } from "react-toastify";

interface Props {
  onShowForm: boolean;
  onCloseForm: Function;
  errorForm: Err_Req_Product | undefined;
  product: Res_Product | undefined;
  setProduct: Function;
  toggleChangeImage: boolean;

  setToggleChangeImage: Function;
}
export default function UpdateProduct(props: Props) {
  const [categorys, setCategorys] = useState<Res_Category[]>([]);
  const [images, setImages] = useState<Res_Images[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState<Res_Images[]>([]);
  const [dataSend, setDataSend] = useState<F_Product_Update>();
  console.log(props.product);
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
      props.product as Res_Product;

    // Logic để lưu thông tin
    let formData;
    if (!dataSend) {
      formData = {
        sku,
        product_name,
        price,
        quantity_stock,
        description,
        // category_id: props.product?,
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
        const res = await productService.editProduct(formData, props.product?.id as number);

        toast.success("Product updated successfully", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileInputRefs = useRef<any>([]);

  const handleImageClick = (index: number) => {
    fileInputRefs.current[index].click();
  };

  // const handleFileChange = (event: any, index: number) => {
  //   const selectedFile = event.target.files[0];
  //   console.log("File selected for image", index, ":", selectedFile);
  //   // Thực hiện xử lý với file đã chọn, có thể lưu vào state hoặc xử lý theo nhu cầu
  // };

  const handleFileChange = (event: any, index: number) => {
    const file = event.target.files[0]; // Lấy ra file từ sự kiện onChange

    // Sử dụng FileReader để đọc URL của file
    const reader = new FileReader();
    reader.onload = () => {
      // const updatedImageUrl = reader.result; // URL của ảnh được lưu trong reader.result
      // handleImageChange(index, updatedImageUrl); // Gọi hàm để cập nhật ảnh với URL mới
    };
    reader.readAsDataURL(file); // Đọc file và khi hoàn thành, sẽ gọi sự kiện onload với URL của ảnh
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
  };

  return (
    <div>
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
                    <InputLabel id="Category">Category</InputLabel>
                    <Select
                      label="Category"
                      disabled={!isEditing}
                      id="demo-simple-select-label"
                      name="category_name"
                      onChange={handleFormChange}
                      value={props.product?.category.id ?? ""}
                    >
                      {categorys.length > 0 &&
                        categorys.map((category, index) => (
                          <MenuItem value={category.id} key={index}>
                            {category.category_name}
                          </MenuItem>
                        ))}
                      {(!props.product?.category.id ||
                        !categorys.some((cat) => cat.id === props.product?.category.id)) && (
                        <MenuItem value={-1}>Default Category</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>

                <Box display={"flex"} gap={2}>
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
                </Box>
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled={!isEditing}
                    margin="normal"
                    required
                    id="description"
                    label="Description"
                    name="description"
                    fullWidth
                    value={props.product?.description}
                    onChange={handleFormChange}
                    error={Boolean(props.errorForm?.msgDescription)}
                    helperText={props.errorForm?.msgDescription}
                  />
                </Box>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  {/* {images.map((image: any, index: number) => (
                    <div key={index} style={{ border: "1px solid #ccc" }}>
                      <input
                        disabled={!isEditing}
                        type="file"
                        accept="image/*"
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, index)}
                      />
                      <label onClick={() => handleImageClick(index)}>
                        <img
                          src={image.image_url}
                          alt={`Preview ${index}`}
                          style={{
                            maxWidth: 200,
                            cursor: "pointer",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                        <span>Click image onChange</span>
                      </label>
                    </div>
                  ))} */}
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
                    onClick={() => props.onCloseForm("update")}
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

function UpdateImgages(props: any) {
  console.log(props.newImages);
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
