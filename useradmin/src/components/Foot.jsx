import React from "react";
import { Footer } from "flowbite-react";

export default function Foot() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Ant-mann"
          />
          <Footer.LinkGroup>
            <Footer.Link as={"div"}>About</Footer.Link>
            <Footer.Link as={"div"}>Privacy Policy</Footer.Link>
            <Footer.Link as={"div"}>Licensing</Footer.Link>
            <Footer.Link as={"div"}>Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by="Ant-mann"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}
