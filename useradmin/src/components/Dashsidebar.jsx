import { React, useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiInbox, HiUser, HiArrowSmRight } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import { Users } from "../pages";

export default function Dashsidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabFromUrl = urlParams.get("tab");
    if (TabFromUrl) {
      setTab(TabFromUrl);
    }
  }, [location.pathname]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              label={"User"}
              labelColor="dark"
              href="#"
              icon={HiUser}
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
