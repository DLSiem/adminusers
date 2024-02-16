import React from "react";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar fluid rounded className="border-b-2 border-gray-400 bg-green-50">
      <Link to="/">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ant-mann
          </span>
        </Navbar.Brand>
      </Link>
      <div className="flex md:order-2">
        <Button className="mx-2" onClick={() => dispatch(toggleTheme())}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button>
            <Link to="/signup">Sign Up</Link>
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} href="/" as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/users"} as={"div"}>
          <Link to="/users">Users</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard"} as={"div"}>
          <Link to="/dashboard">Dashboard</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
