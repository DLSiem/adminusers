import React from "react";
import { useState } from "react";
import { TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "./../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    dispatch(signInFailure(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }

      formData.email = "";
      formData.password = "";
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex-1 rounded-md border-2 mx-2 p-4 max-w-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              id="password"
              placeholder="password"
              value={formData.password1}
              onChange={HandleChange}
              required
            />
          </div>

          <Button className="w-full" type="submit">
            {loading ? (
              <>
                <Spinner /> <span className="pl-4">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-xs">
            Not yet signup ?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/signup"
            >
              Sign Up
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
  );
}
