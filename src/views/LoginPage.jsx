import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../lib/axios";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const handleDefaultLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      toast.success("Successfully logged in");
      navigate("/");
    } catch (error) {
      console.log(error, "<<erorrrrr");
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await axios.get("/auth/google", {
        headers: {
          token: response.credential,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      localStorage.setItem("token", data.access_token);
      toast.success("Successfully logged in");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="m-8 flex gap-4">
        <div className="w-full mt-0">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Welcome to HackTV!
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Enter your email and password to Sign In.
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleDefaultLogin}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="yourmail@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Sign In
            </Button>

            <div className="space-y-4 mt-8">
              <Button
                size="lg"
                color="white"
                className="flex items-center gap-2 justify-center shadow-md"
                fullWidth
              >
                <GoogleLogin onSuccess={handleGoogleLogin} />
              </Button>
            </div>
            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Not registered?
              <Link to="/auth/register" className="text-gray-900 ml-1">
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
