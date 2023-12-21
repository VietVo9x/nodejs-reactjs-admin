import Category from "../pages/Category";
import DashBoard from "../pages/DashBoard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Users from "../pages/Users";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Trash from "../pages/Trash";

export const links = [
  {
    path: "/",
    title: "Users",
    icon: <SupervisedUserCircleIcon />,
    element: <Users />,
  },
  {
    path: "/dash-board",
    title: "Dashboard",
    icon: <SupervisedUserCircleIcon />,
    element: <DashBoard />,
  },

  {
    path: "/category",
    title: "Category",
    icon: <CategoryIcon />,
    element: <Category />,
  },

  {
    path: "/products",
    title: "Products",
    icon: <StoreIcon />,
    element: <Products />,
  },
  {
    path: "/orders",
    title: "Orders",
    icon: <AttachMoneyIcon />,
    element: <Orders />,
  },
  {
    path: "trash",
    title: "Trash",
    icon: <RestoreFromTrashIcon />,
    element: <Trash />,
  },
];
