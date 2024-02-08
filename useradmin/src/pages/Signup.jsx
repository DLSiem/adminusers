import React from "react";
import { Card, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          Ant-man
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1 rounded-md border-2 p-4">
          <form action="" className="flex flex-col gap-4">
            <div className="mb-2 block">
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>

            <div className="mb-2 block">
              <TextInput
                id="email1"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="mb-2 block">
              <TextInput type="password1" placeholder="password" />
            </div>
            <div className="mb-2 block">
              <TextInput type="password2" placeholder="confirm password" />
            </div>

            <Button className="w-full" type="submit">
              Sign up
            </Button>
          </form>
          <div className="mt-2">
            <p className="text-xs">
              Already have an account?{" "}
              <Link
                className="text-blue-600 font-semibold hover:underline"
                to="/signin"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
