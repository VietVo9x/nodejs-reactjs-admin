import "./App.scss";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Routes, Route, useParams, useLocation, useNavigate } from "react-router-dom";

import { links } from "./routes";
import Login from "./pages/Login";

import { useFetchData } from "./hooks/fetchData";
import CircularIndeterminate from "./components/Progress";
function App() {
  // const { loading, user, error, isLogin } = useFetchData();
  const loading = false;
  const isLogin = true;
  const user = { role: 1 };

  return (
    <>
      <div className="App">
        {loading ? (
          <CircularIndeterminate />
        ) : isLogin && user && user.role == 1 ? (
          <>
            <Header />
            <div className="main">
              <SideBar />
              <Routes>
                {links.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))}
              </Routes>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default App;
