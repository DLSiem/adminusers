import { useEffect, useState } from "react";
import { Button, Sidebar } from "flowbite-react";
import DashProfile from "../components/DashProfile";
import Dashsidebar from "../components/Dashsidebar";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <Dashsidebar />
      </div>
      {tab === "profile" ? <DashProfile /> : null}
    </div>
  );
}
