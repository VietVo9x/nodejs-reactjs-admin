import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";

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
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { formatDate } from "../../utils/format.date";
export default function Orders() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const styleBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    border: "1px solid #ccc",
    width: "30px",
    height: "30px",
    padding: "20px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
  };
  return (
    <Container maxWidth="xl">
      {/* filter */}
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "300px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="filled-search" label="Search field" type="search" variant="filled" />
        </Box>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150, margin: "30px 0 " }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sort by name</MenuItem>
            <MenuItem value={20}>Sort by status</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Serial Number</TableCell>
              <TableCell align="center">Order at</TableCell>
              <TableCell align="center">Total price</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Create at</TableCell>
              <TableCell align="center">Updated at</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell scope="row" align="center">
                    1
                  </TableCell>
                  <TableCell scope="row" align="center">
                    2023-11-12
                  </TableCell>
                  <TableCell scope="row" align="center">
                    $ 100.00
                  </TableCell>

                  <TableCell align="center">Đã xác thực</TableCell>
                  {/* <TableCell align="center">
                  <Typography
                    component={"span"}
                    sx={{
                      display: "-webkit-box",
                      maxWidth: "50px",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {order.note}
                  </Typography>
                </TableCell> */}
                  <TableCell scope="row" align="center">
                    2023-11-12
                  </TableCell>
                  <TableCell scope="row" align="center">
                    2023-11-12
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography component={"span"} sx={styleBtn} onClick={() => setOpen(true)}>
                      <RemoveRedEyeIcon color="inherit" />
                    </Typography>
                    <Typography component={"span"} sx={styleBtn}>
                      <EditIcon color="inherit" />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* phan trang */}
      <Stack spacing={2} sx={{ padding: "15px 0" }}>
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChangePage} color="primary" />
      </Stack>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box component={"div"} sx={{ textAlign: "right", marginTop: "15px" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
