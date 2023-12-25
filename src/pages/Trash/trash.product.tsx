import {
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Empty from "../../components/Empty";
import { Product_Res } from "../../types/reponse.type";
import React, { useState } from "react";
import { formatCurrency, perPage } from "../../utils/constants";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useSearchParams } from "react-router-dom";
import { _PRODUCT_GET_DELETE } from "../../apis";
import { getData } from "../../apis/api.service";
import { TrashService } from "./trash.service";
import { displayError } from "../../utils/common/display-error";

export default function TrashProduct() {
  const [products, setProducts] = useState<Product_Res[]>([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const trashService = new TrashService();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [count, setCount] = useState(0);
  const params = React.useRef<{ [key: string]: any }>({ limit: 10 });

  React.useEffect(() => {
    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    getData(_PRODUCT_GET_DELETE, params.current).then((res: any) => {
      setProducts(res?.products);
      setCount(Math.ceil(res?.total / perPage));
    });
  }, [searchParams, flag]);
  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //restore
  const handleRestoreProduct = async (id: number) => {
    setIsLoading(true);
    try {
      await trashService.retoreProduct(id);
      setIsLoading(false);
      setFlag(!flag);
    } catch (error) {
      setIsLoading(false);

      displayError(error);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <>
          <Empty title="Product Trash Empty" />
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
                          color="primary"
                          disabled={isLoading}
                          onClick={() => handleRestoreProduct(product.id)}
                        >
                          <RestoreFromTrashIcon />
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
    </>
  );
}
