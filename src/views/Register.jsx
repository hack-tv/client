import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const registered = { name, email, password };
      const { data } = await axios.post(`${url}/auth/register`, registered);

      toast.success("Successfully register");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <section className="m-8 flex">
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Join HackTV
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Enter your name email and password to join HackTV
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleRegister}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your name
              </Typography>
              <Input
                size="lg"
                placeholder="your name"
                onChange={(e) => setName(e.target.value)}
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
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
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
              Register Now
            </Button>

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Already have an account?
              <Link to="/login" className="text-gray-900 ml-1">
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </>
  );
}
