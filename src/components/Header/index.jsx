import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
import { Button } from "react-bootstrap";

const Header = () => {
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const isUserLoggedIn = role === "user";
  const isAdminLoggedIn = role === "admin";

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("role");
    navigate("/");
  };

  const renderLinks = () => {
    if (isUserLoggedIn) {
      return (
        <Nav className="ms-auto">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link bold ${isActive ? "text-success" : "text-white"}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `nav-link bold ${isActive ? "text-success" : "text-white"}`
            }
          >
            Orders
          </NavLink>
          <Button
            variant="danger"
            onClick={onClickLogout}
            className="ms-5 bold"
          >
            Logout
          </Button>
        </Nav>
      );
    } else if (isAdminLoggedIn) {
      return (
        <Nav className="ms-auto">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-success" : "text-white"}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/Signup"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-success" : "text-white"}`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/Signup"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-success" : "text-white"}`
            }
          >
            Logout
          </NavLink>
        </Nav>
      );
    }
    return (
      <Nav className="ms-auto">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `nav-link bold ${isActive ? "text-success" : "text-white"}`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/Signup"
          className={({ isActive }) =>
            `nav-link bold ${isActive ? "text-success" : "text-white"}`
          }
        >
          Signup
        </NavLink>
      </Nav>
    );
  };
  return (
    <Navbar expand="lg" className="bg-dark br-3 ps-4 pe-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bold navbar-brand ${isActive ? "text-success" : "text-white"}`
        }
      >
        Plants
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
      <Navbar.Collapse id="basic-navbar-nav">{renderLinks()}</Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
