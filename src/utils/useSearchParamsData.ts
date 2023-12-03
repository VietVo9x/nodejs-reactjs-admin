import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchParamsData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") || "");
  const [count, setCount] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const params: any = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return {
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
  };
};

export default useSearchParamsData;
