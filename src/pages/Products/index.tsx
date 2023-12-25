import * as React from "react";
import { useState } from "react";

import FormControl from "@mui/material/FormControl";
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
  NativeSelect,
  Autocomplete,
  TextField,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { ProductServices } from "./products.service";
import { ToastContainer, toast } from "react-toastify";

import { useSearchParams } from "react-router-dom";
import { formatCurrency, perPage } from "../../utils/constants";
import { getData } from "../../apis/api.service";
import { useFormStatus } from "../../utils/customhooks/function.custom";
import { F_Product } from "../../types/form.type";
import CreateProduct from "./create.product";
import { Err_Req_Product } from "../../types/error.request";
import CustomizedInputBase from "../../components/InputSearch";
import UpdateProduct from "./update.product";
import { _PRODUCT, _PRODUCT_GET_ALL } from "../../apis";
import { Product_Res } from "../../types/reponse.type";
import { displayError } from "../../utils/common/display-error";
import { displaySuccessMessage } from "../../utils/common/display-success";
import NoReCord from "../../components/Empty";
import Empty from "../../components/Empty";
export default function Products() {
  const { openFormCreate, openFormUpdate, handleShowForm, handleClose } = useFormStatus();
  const [flag, setFlag] = useState(false);
  const [age, setAge] = React.useState("");
  const [products, setProducts] = useState<Product_Res[]>([]);
  const [product, setProduct] = useState<Product_Res>();
  const [errorForm, setErrorForm] = useState<Err_Req_Product | undefined>();

  const [newProduct, setNewProduct] = useState<F_Product>({
    product_name: "",
    price: undefined,
    quantity_stock: undefined,
    description: "",
    categoryId: 1,
    fileInput: undefined,
  });

  const productServices = new ProductServices(); //services

  //filter data start
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const params = React.useRef<{ [key: string]: any }>({ limit: 10 });
  React.useEffect(() => {
    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    getData(_PRODUCT_GET_ALL, params.current).then((res: any) => {
      console.log(res?.products, "result");
      setProducts(res?.products);
      setCount(Math.ceil(res?.total / perPage));
    });
  }, [searchParams, flag]);
  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params.current, search_name: searchValue, page: "1" });
  };
  const clearSearch = () => {
    setSearchParams({ ...params.current, search_name: "" });
    setSearchValue("");
  };
  //sort
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAge(event.target.value);
    switch (event.target.value.toString()) {
      case "1":
        setSearchParams({
          ...params.current,
          page: "1",
          sort: "name",
          order: "ASC",
        });
        break;
      case "2":
        setSearchParams({
          ...params.current,
          page: "1",
          sort: "name",
          order: "DESC",
        });

        break;

      case "3":
        setSearchParams({ ...params.current, page: "1", sort: "price", order: "ASC" });
        break;
      case "4":
        setSearchParams({ ...params.current, page: "1", sort: "price", order: "DESC" });
        break;
      default:
        setSearchParams({ ...params.current, page: "1", sort: "", order: "" });
        break;
    }
  };
  //filter data end

  //show form update
  const handleShowFormUpdate = (product: Product_Res) => {
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
  };

  //show form new
  const handleShowFormNew = () => {
    handleShowForm("create");
    setNewProduct({
      product_name: "",
      price: undefined,
      quantity_stock: undefined,
      description: "",
      categoryId: 1,
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
  const handleSoftDelete = async (id: number) => {
    try {
      const conf = window.confirm("Are you sure you want to delete");
      if (!conf) return;
      const softDelete = {
        isDelete: "true",
      };
      await productServices.softDelete(id, softDelete);

      displaySuccessMessage("Deleted Product successfully");
      setFlag(!flag);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* filter */}

      <Box
        component={"div"}
        mt={3}
        mb={5}
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
        <Box>
          <Button
            variant="contained"
            sx={{ marginRight: "10px" }}
            onClick={handleShowFormNew}
            startIcon={<AddIcon />}
          >
            New Product
          </Button>
        </Box>

        <Box sx={{ minWidth: 150, marginRight: 10 }}>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={age}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={handleChangeSelect}
            >
              <option value={""}>Sort</option>
              <option value={1}>Name (A - Z)</option>
              <option value={2}>Name (Z - A)</option>
              <option value={3}>Price(Lowest)</option>
              <option value={4}>Thirty(Highest)</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      {/* table  */}

      {products.length === 0 ? (
        <>
          <Empty title="Product Empty" />
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell scope="row">Index</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{
                          width: "20px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{product.product_name}</TableCell>
                      <TableCell align="center">{formatCurrency(product.price)}</TableCell>
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
                          onClick={() => handleSoftDelete(product.id)}
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
        </>
      )}

      {/* modal */}
      <UpdateProduct
        onShowForm={openFormUpdate}
        onCloseForm={handleClose}
        errorForm={errorForm}
        product={product}
        setProduct={setProduct}
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
