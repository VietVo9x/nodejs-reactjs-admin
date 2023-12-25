import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
interface Props {
  title: string;
}
export default function Empty(props: Props) {
  return (
    <section className="cart--empty">
      <h1>{props.title}</h1>
    </section>
  );
}
