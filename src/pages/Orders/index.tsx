import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Pagination,
  Container,
  NativeSelect,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { formatDate } from "../../utils/format.date";
import { Orders_Res } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { _ORDER } from "../../apis";
import { useSearchParams } from "react-router-dom";
import { formatCurrency, perPage } from "../../utils/constants";
import CustomizedInputBase from "../../components/InputSearch";
import ViewOrder from "./view.order";
import { displayError } from "../../utils/common/display-error";
import OrderService from "./orders.service";
import Empty from "../../components/Empty";
export default function Orders() {
  const [age, setAge] = React.useState("");
  const [orders, setOrders] = useState<Orders_Res[]>([]);
  const [order, setOrder] = useState<Orders_Res | undefined>();
  console.log(orders);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const orderService = new OrderService();
  //filter, sort,search
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const params = React.useRef<{ [key: string]: any }>({ limit: 10 });
  React.useEffect(() => {
    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    getData(_ORDER, params.current).then((res: any) => {
      if (res) {
        setOrders(res.orders);
        setCount(Math.ceil(res?.total / perPage));
      }
    });
  }, [searchParams, flag]);
  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params.current, user_name: searchValue, page: "1" });
  };
  const clearSearch = () => {
    setSearchParams({ ...params.current, user_name: "" });
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
          sort: "createdAt",
          order: "ASC",
        });
        break;
      case "2":
        setSearchParams({
          ...params.current,
          page: "1",
          sort: "createdAt",
          order: "DESC",
        });

        break;

      default:
        setSearchParams({ ...params.current, page: "1", sort: "", order: "" });
        break;
    }
  };

  const handleShowForm = (order: Orders_Res) => {
    setOpen(true);
    setOrder(order);
  };

  //xac nhan don hang
  const handleOrderConfirmation = async (id: number) => {
    try {
      await orderService.confirmOrder(id);
      setFlag(!flag);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mt={3}
          mb={5}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "300px" },
            }}
            noValidate
            autoComplete="off"
          >
            <CustomizedInputBase
              setSearchValue={setSearchValue}
              onSearch={handleSearch}
              searchValue={searchValue}
              onClearSearch={clearSearch}
            />
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
                <option value={1}>CreatedAt (Old)</option>
                <option value={2}>CreatedAt (New)</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
        <>
          {orders && orders.length > 0 ? (
            <>
              {" "}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Index</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Total price</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">CreatedAt</TableCell>
                      <TableCell align="center">UpdatedAt</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order: Orders_Res, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell scope="row" align="left">
                          {index}
                        </TableCell>
                        <TableCell scope="row" align="center">
                          {order.user_name}
                        </TableCell>
                        <TableCell scope="row" align="center">
                          {formatCurrency(order.all_price)}
                        </TableCell>

                        <TableCell scope="row" align="center">
                          {" "}
                          <Typography p={1} sx={{ p: 1, color: order.status ? "green" : "red" }}>
                            {order.status ? "Complete" : "Pending"}{" "}
                          </Typography>
                        </TableCell>

                        <TableCell scope="row" align="center">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell scope="row" align="center">
                          {formatDate(order.updatedAt)}
                        </TableCell>
                        <TableCell scope="row" align="center">
                          <Button onClick={() => handleShowForm(order)}>
                            <RemoveRedEyeIcon color="inherit" />
                          </Button>
                          <Button
                            onClick={() => handleOrderConfirmation(order.id)}
                            disabled={order.status ? true : false}
                          >
                            <CheckCircleOutlineIcon color="inherit" />
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
              <ViewOrder order={order} open={open} setOpen={setOpen} />
            </>
          ) : (
            <Empty title="Orders is Empty" />
          )}
        </>
      </Container>
    </>
  );
}
