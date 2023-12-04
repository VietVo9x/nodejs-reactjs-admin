import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Pagination,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { ProductServices } from "./products.service";
import { ToastContainer, toast } from "react-toastify";

import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/constants";
import { getData } from "../../apis/api.service";
import { useFormStatus } from "../../utils/function.custom";
import { Res_Product } from "../../types/reponse.type";
import UpdateProduct from "./update.product";
import { F_Product } from "../../types/form.type";
import CreateProduct from "./create.product";
import { Err_Req_Product } from "../../types/error.request";
import CustomizedInputBase from "../../components/InputSearch";
import { Res_Error } from "../../types/error.response";
export default function Products() {
  const { openFormCreate, openFormUpdate, handleShowForm, handleClose } = useFormStatus();
  const [flag, setFlag] = useState(false);
  const [age, setAge] = React.useState("");
  const [products, setProducts] = useState<Res_Product[]>([]);
  const [product, setProduct] = useState<Res_Product | undefined>();
  const [errorForm, setErrorForm] = useState<Err_Req_Product>({
    isError: false,
    msgSku: "",
    msgCategory: "",
    msgProductName: "",
    msgDescription: "",
    msgPrice: "",
    msgQuantityStock: "",
    msgImage: "",
  });

  const [newProduct, setNewProduct] = useState<F_Product>({
    sku: "",
    product_name: "",
    price: undefined,
    quantity_stock: undefined,
    description: "",
    category_id: 1,
    fileInput: undefined,
  });
  const [toggleChangeImage, setToggleChangeImage] = useState(false);

  //call api lay du lieu lan dau
  const productServices = new ProductServices(); //services

  //filter data start
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  React.useEffect(() => {
    getData(
      `/product?page=${page}&limit=6&search=${search}&sort=${sortValue}&order=${sortOrder}`
    ).then((res: any) => {
      setProducts(res?.data);
      setCount(Math.ceil(res?.headers["x-total-products"] / perPage));
    });
  }, [page, search, sortValue, sortOrder, flag]);

  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params, search: searchValue, page: 1 });
  };
  const clearSearch = () => {
    setSearchParams({ ...params, search: "" });
    setSearchValue("");
  };
  //sort
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSearchParams({ ...params, page: "1" });
    setAge(event.target.value);

    switch (event.target.value.toString()) {
      case "1":
        setSortValue("product_name");
        setSortOrder("ASC");
        break;

      case "2":
        setSortValue("product_name");
        setSortOrder("DESC");
        break;

      case "3":
        setSortValue("price");
        setSortOrder("ASC");

        break;
      case "4":
        setSortValue("price");
        setSortOrder("DESC");
        break;
    }
  };
  //filter data end

  //show form update
  const handleShowFormUpdate = (product: Res_Product) => {
    console.log("product", product);
    handleShowForm("update");
    setProduct(product);
    setErrorForm({
      isError: false,
      msgSku: "",
      msgCategory: "",
      msgProductName: "",
      msgDescription: "",
      msgPrice: "",
      msgQuantityStock: "",
      msgImage: "",
    });
    setToggleChangeImage(false);
  };

  //show form new
  const handleShowFormNew = () => {
    handleShowForm("create");
    console.log(1111);
    setNewProduct({
      sku: "",
      product_name: "",
      price: undefined,
      quantity_stock: undefined,
      description: "",
      category_id: 1,
      fileInput: undefined,
    });
    setErrorForm({
      isError: false,
      msgSku: "",
      msgCategory: "",
      msgProductName: "",
      msgDescription: "",
      msgPrice: "",
      msgQuantityStock: "",
      msgImage: "",
    });
  };

  //delete san pham
  const handleDelete = async (id: number) => {
    try {
      const conf = window.confirm("Are you sure you want to delete");
      if (!conf) return;
      await productServices.deleteProduct(id);

      toast.success("Product deleted successfully", {
        autoClose: 1000,
      });
      setFlag(!flag);
    } catch (error) {
      const newError = error as Res_Error;
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* filter */}

      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomizedInputBase
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          searchValue={searchValue}
          onClearSearch={clearSearch}
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 150, margin: "30px 50px " }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChangeSelect}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Name (A - Z)</MenuItem>
            <MenuItem value={2}>Name (Z - A)</MenuItem>
            <MenuItem value={3}>Price(Lowest)</MenuItem>
            <MenuItem value={4}>Thirty(Highest)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* table  */}
      <Box mb={5}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={handleShowFormNew}
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{product.product_name}</TableCell>
                  <TableCell align="center">{product.sku}</TableCell>
                  <TableCell align="center">$ {product.price}.00</TableCell>

                  <TableCell align="center">{product.quantity_stock}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px" }}
                      onClick={() => handleShowFormUpdate(product)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* phan trang */}
      <Stack spacing={2} sx={{ padding: "15px 0" }}>
        <Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
      </Stack>

      {/* modal */}
      <UpdateProduct
        onShowForm={openFormUpdate}
        onCloseForm={handleClose}
        errorForm={errorForm}
        product={product}
        setProduct={setProduct}
        toggleChangeImage={toggleChangeImage}
        setToggleChangeImage={setToggleChangeImage}
        flag={flag}
        setFlag={setFlag}
      />
      <CreateProduct
        onShowForm={openFormCreate}
        onCloseForm={handleClose}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        flag={flag}
        setFlag={setFlag}
      />
    </div>
  );
}
