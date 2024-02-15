import React from "react";
import { useState } from "react";
import { TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (
      !formData.username ||
      !formData.email ||
      !formData.password1 ||
      !formData.password2
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      if (formData.password1 === formData.password2) {
        formData.password = formData.password1;
        console.log(formData);
      }
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.message);
        formData.username = "";
        formData.email = "";
        formData.password1 = "";
        formData.password2 = "";
      }
      setIsLoading(false);

      if (res.ok) {
        navigate("/signin");
      }

      formData.username = "";
      formData.email = "";
      formData.password1 = "";
      formData.password2 = "";
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-2 block">
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={HandleChange}
                required
              />
            </div>

            <div className="mb-2 block">
              <TextInput
                id="email"
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={HandleChange}
                required
              />
            </div>
            <div className="mb-2 block">
              <TextInput
                type="password"
                id="password1"
                placeholder="password"
                value={formData.password1}
                onChange={HandleChange}
                required
              />
            </div>
            <div className="mb-2 block">
              <TextInput
                type="password"
                id="password2"
                value={formData.password2}
                placeholder="confirm password"
                onChange={HandleChange}
                required
              />
            </div>

            <Button className="w-full" type="submit">
              {isLoading ? (
                <>
                  <Spinner /> <span className="pl-4">Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <OAuth />
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
          {errorMessage && (
            <Alert
              type="error"
              className="mt-4 font-medium"
              color="failure"
              icon={HiInformationCircle}
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
