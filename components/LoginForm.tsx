import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterForm from "./RegisterForm";

type RegisteredUser = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const registeredUserSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisteredUser>({ resolver: yupResolver(registeredUserSchema) });

  const loginSubmit: SubmitHandler<RegisteredUser> = (data) => {
    console.log("jooooo");
    axios.get("/api/login").then((res) => console.log(res.data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="flex flex-col gap-12 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        {isRegistered ? (
          <>
            <span className="text-3xl font-semibold">
              Sign in to your account
            </span>
            <form onSubmit={handleSubmit(loginSubmit)}>
              <div className="flex flex-col gap-8 max-w-[450px] w-[450px]">
                <TextField
                  id="standard-basic"
                  label="Email"
                  {...register("email")}
                  variant="standard"
                  sx={{
                    ".MuiFormLabel-root": { color: "var(--text-color)" },
                    ".MuiInputBase-root::before": {
                      borderBottomColor: "var(--text-color)",
                    },
                    ".MuiInputBase-root": { color: "var(--text-color)" },
                  }}
                />
                {errors.email ? (
                  <p className="text-red-500 font-md text-sm">
                    {errors.email?.message}
                  </p>
                ) : null}
                <FormControl variant="standard">
                  <InputLabel
                    style={{ color: "var(--text-color)" }}
                    htmlFor="standard-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <Input
                    className="before:border-b-[var(--text-color)]"
                    {...register("password")}
                    sx={{
                      // ".MuiInputBase-root": { color: "var(--text-color)" },
                      "& .MuiInputBase-root-MuiInput-root::before": {
                        borderBottomColor: "red",
                      },
                      ".MuiInput-input": { color: "var(--text-color)" },
                    }}
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ color: "var(--text-color)" }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.password ? (
                  <p className="text-red-500 font-md text-sm">
                    {errors.password?.message}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-600 font-semibold hover:bg-blue-700"
                >
                  Log in
                </Button>
                <span className="text-xs flex gap-2 justify-end">
                  Don&apos;t have an account?{" "}
                  <button
                    className="text-violet-400 font-semibold"
                    onClick={() => {
                      setIsRegistered(!isRegistered);
                    }}
                  >
                    Sign up
                  </button>
                </span>
              </div>
            </form>
          </>
        ) : (
          <RegisterForm
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        )}
      </div>
    </>
  );
}
