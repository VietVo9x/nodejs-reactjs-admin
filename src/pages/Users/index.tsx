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
  Button,
  Pagination,
  FormControl,
  NativeSelect,
  Typography,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { formatDate } from "../../utils/format.date";
import { User_Res } from "../../types/reponse.type";
import UserServices from "./user.service";
import { ToastContainer, toast } from "react-toastify";
import { perPage } from "../../utils/constants";
import { getData } from "../../apis/api.service";
import { _USER } from "../../apis";
import ViewUser from "./view.user";
import useSearchParamsData from "../../utils/useSearchParamsData";
import CreateUser from "./create.user";
import { Err_Req_UserRegister } from "../../types/error.request";
import { useFormStatus } from "../../utils/customhooks/function.custom";
import { F_UserRegister } from "../../types/form.type";
import CustomizedInputBase from "../../components/InputSearch";
import { displayError } from "../../utils/common/display-error";

export default function Users() {
  const { openFormView, openFormCreate, handleShowForm, handleClose } = useFormStatus();
  const [age, setAge] = React.useState("");
  const [users, setUsers] = useState<User_Res[]>([]);
  const [action, setAction] = useState("");
  const [userView, setUserView] = useState<User_Res>();
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
        `${_USER}?page=${page}&limit=10&search_name=${search}&sort_name=${sortValue}&sort_order=${sortOrder}`
      );
      setUsers(res?.users);
      setCount(Math.ceil(res?.totalUsers / perPage));
    } catch (error) {
      displayError(error);
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
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSearchParams({ ...params, page: "1" });
    setAge(event.target.value);

    switch (event.target.value.toString()) {
      case "1":
        setSortValue("name");
        setSortOrder("ASC");
        break;

      case "2":
        setSortValue("name");
        setSortOrder("DESC");
        break;
      default:
        setSortValue("");
        setSortOrder("");
    }
  };

  //services
  const userServices = new UserServices();

  //mở form view user
  const handleShowViewForm = (user: User_Res) => {
    setUserView(user);
    setAction(action);
    handleShowForm("view");
  };
  //mở form create user
  const handleShowCreateForm = () => {
    setUserView(undefined);
    handleShowForm("create");
  };

  //handleEditStatus
  const handleEditStatus = async (id: number, user: User_Res) => {
    try {
      const updateUser = {
        status: "false",
      };
      if (user.status) {
        updateUser.status = "false";
      } else {
        updateUser.status = "true";
      }

      await userServices.updateStatusUser(id, updateUser);
      toast.success("Updated status user successfully", {
        autoClose: 1000,
      });
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
          searchValue={searchValue}
          onSearch={handleSearch}
          onClearSearch={clearSearchValue}
        />
        <Box>
          <Button
            variant="contained"
            sx={{ marginRight: "10px" }}
            onClick={handleShowCreateForm}
            startIcon={<AddIcon />}
          >
            New User
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
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      {/* table  */}
      {users.length == 0 ? (
        <div>
          <h1>khong co gi</h1>
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Index</TableCell>
                  <TableCell align="center">UserName</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Create at</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.user_name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role == 0 ? "User" : ""}</TableCell>
                    <TableCell align="center">{formatDate(user.createdAt)}</TableCell>
                    <TableCell align="center">
                      <Typography p={1} sx={{ p: 1, color: user.status ? "green" : "red" }}>
                        {user.status ? "Active" : "Block"}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
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
                        sx={{ minWidth: "100px" }}
                      >
                        {user.status ? "Block" : "Active"}
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
        setFlag={setFlag}
        flag={flag}
      />
    </div>
  );
}
