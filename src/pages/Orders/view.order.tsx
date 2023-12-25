import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Order_Detail_Res, Orders_Res } from "../../types/reponse.type";
import { formatCurrency } from "../../utils/constants";
interface Props {
  order: Orders_Res | undefined;
  open: boolean;
  setOpen: Function;
}
export default function ViewOrder(props: Props) {
  const [order, setOrder] = useState<Orders_Res | undefined>();
  console.log(order);
  useEffect(() => {
    if (props.order) {
      setOrder(props.order);
    } else {
      setOrder(undefined);
    }
  }, [props.order]);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1200px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    maxHeight: "100vh",
  };
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box border={"1px solid #ccc"} mb={1} sx={style}>
        {order &&
          order.orderDetails.map((item: Order_Detail_Res, index: number) => {
            return (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.image} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="body2">{item.name}</Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          x{item.quantity}
                        </Typography>
                        {` - total: ${formatCurrency(item.total_price)}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Box>
            );
          })}
        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography p={1} sx={{ p: 1, color: order && order.status ? "green" : "red" }}>
            {order && order.status ? "Complete" : "Pending"}{" "}
          </Typography>
          <Typography pb={1} pr={2}>
            Total :{order && formatCurrency(order.all_price)}
          </Typography>
        </Stack>
        <Box textAlign={"right"}>
          {" "}
          <Button onClick={() => props.setOpen(false)}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}
