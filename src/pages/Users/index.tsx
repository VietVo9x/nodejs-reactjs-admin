import * as React from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Button,
  Pagination,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { formatDate } from "../../utils/format.date";
import { Res_UserEntity } from "../../types/reponse.type";
import UserServices from "./user.service";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/constants";
import { getData } from "../../apis/api.service";
import { _USER } from "../../apis";
import ViewUser from "./view.user";
import useSearchParamsData from "../../utils/useSearchParamsData";
import CreateUser from "./create.user";
import { Err_Req_UserRegister } from "../../types/error.request";
import { useFormStatus } from "../../utils/function.custom";
import { F_UserRegister } from "../../types/form.type";
import CustomizedInputBase from "../../components/InputSearch";
import { Res_Error } from "../../types/error.response";

export default function Users() {
  const { openFormView, openFormCreate, handleShowForm, handleClose } = useFormStatus();
  const [age, setAge] = React.useState("");
  const [users, setUsers] = useState<Res_UserEntity[]>([]);
  const [action, setAction] = useState("");
  const [userView, setUserView] = useState<Res_UserEntity | undefined>();
  const [userCreate, setUserCreate] = useState<F_UserRegister>({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errorForm, setErrorForm] = useState<Err_Req_UserRegister>({
    isError: false,
    msgUserName: "",
    msgEmail: "",
    msgPassword: "",
    msgConfirmPassword: "",
  });
  const [flag, setFlag] = useState<boolean>(false);
  //phân trang, filter , sort , search
  const {
    setSearchParams,
    searchValue,
    setSearchValue,
    count,
    setCount,
    sortValue,
    setSortValue,
    sortOrder,
    setSortOrder,
    page,
    search,
    params,
  } = useSearchParamsData();

  //call api

  const fetchData = async () => {
    try {
      const res = await getData(
        `${_USER}?page=${page}&limit=6&name=${search}&sort=${sortValue}&order=${sortOrder}&role='1'`
      );
      setUsers(res?.data);
      setCount(Math.ceil(res?.headers["x-total-users"] / perPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, sortValue, sortOrder, flag]);

  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params, page: value.toString() });
  };

  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params, search: searchValue });
  };
  //xoa tim kiem
  const clearSearchValue = () => {
    setSearchParams({ ...params, search: "" });
    setSearchValue("");
  };
  //sort
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSearchParams({ ...params, page: "1" });
    setAge(event.target.value);

    switch (event.target.value.toString()) {
      case "1":
        setSortValue("user_name");
        setSortOrder("ASC");
        break;

      case "2":
        setSortValue("user_name");
        setSortOrder("DESC");
        break;
      default:
        setSortValue("");
        setSortOrder("");
    }
  };

  //services
  const userServices = new UserServices();

  const handleShowViewForm = (user?: Res_UserEntity) => {
    handleShowForm("view");
    setUserView(user);
    setAction(action);
  };
  // handle action

  //handleEditStatus
  const handleEditStatus = async (id: number, user: Res_UserEntity) => {
    try {
      let updateStatusUser;
      if (user.status == 1) {
        updateStatusUser = { status: 0 };
      } else {
        updateStatusUser = { status: 1 };
      }
      await userServices.updateStatusUser(id, updateStatusUser);
      toast.success("Updated status user successfully", {
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
          searchValue={searchValue}
          onSearch={handleSearch}
          onClearSearch={clearSearchValue}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150, margin: "30px 60px " }}>
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
            <MenuItem value={1}>NAME (A - Z)</MenuItem>
            <MenuItem value={2}>NAME (Z - A)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* table  */}
      <Box mb={5}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleShowForm("create")}
          startIcon={<AddIcon />}
        >
          New User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="left">UserName</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Create at</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell scope="row">{user.user_name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.role ? "Admin" : "User"}</TableCell>
                <TableCell align="left">{formatDate(user.created_at)}</TableCell>
                <TableCell align="left">{user.status ? "Active" : "Block"}</TableCell>

                <TableCell align="left">
                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleShowViewForm(user)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleEditStatus(user.id, user)}
                  >
                    Block
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
      <ViewUser
        data={userView}
        openFormView={openFormView}
        onShowViewForm={handleShowViewForm}
        onClose={handleClose}
      />
      <CreateUser
        userCreate={userCreate}
        setUserCreate={setUserCreate}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        openFormCreate={openFormCreate}
        onShow={handleShowForm}
        onClose={handleClose}
      />
    </div>
  );
}
