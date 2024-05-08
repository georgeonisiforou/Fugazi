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

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
};

export default function RegisterForm({
  isRegistered,
  setIsRegistered,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const userSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required").min(3),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords should be the same")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema) });

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    axios.post("/api/server", {
      fName: data.firstName,
      lName: data.lastName,
      email: data.email,
      password: data.password,
    });
    console.log("Registered!");
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
        <>
          {" "}
          <span className="text-3xl font-semibold">
            Register to receive your tailored financial news
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 max-w-[450px] sm:w-[450px]">
              <TextField
                id="standard-basic"
                label="First Name"
                {...register("firstName", { required: true, minLength: 3 })}
                variant="standard"
                sx={{
                  ".MuiFormLabel-root": { color: "var(--text-color)" },
                  ".MuiInputBase-root::before": {
                    borderBottomColor: "var(--text-color)",
                  },
                  ".MuiInputBase-root": { color: "var(--text-color)" },
                }}
              />
              {errors.firstName ? (
                <p className="text-red-500 font-md text-sm">
                  {errors.firstName?.message}
                </p>
              ) : null}

              <TextField
                id="standard-basic"
                label="Last Name"
                {...register("lastName", { required: true, minLength: 3 })}
                variant="standard"
                sx={{
                  ".MuiFormLabel-root": { color: "var(--text-color)" },
                  ".MuiInputBase-root::before": {
                    borderBottomColor: "var(--text-color)",
                  },
                  ".MuiInputBase-root": { color: "var(--text-color)" },
                }}
              />
              {errors.lastName ? (
                <p className="text-red-500 font-md text-sm">
                  {errors.lastName?.message}
                </p>
              ) : null}

              <TextField
                id="standard-basic"
                label="Email"
                {...register("email", { required: true })}
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
                  {...register("password", { required: true, minLength: 8 })}
                  name="password"
                  sx={{
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

              <FormControl variant="standard">
                <InputLabel
                  style={{ color: "var(--text-color)" }}
                  htmlFor="standard-adornment-password"
                >
                  Confirm Password
                </InputLabel>
                <Input
                  className="before:border-b-[var(--text-color)]"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                  })}
                  sx={{
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
              {errors.confirmPassword ? (
                <p className="text-red-500 font-md text-sm">
                  {errors.confirmPassword?.message}
                </p>
              ) : null}

              <Button
                variant="contained"
                className="bg-blue-600 font-semibold hover:bg-blue-700"
                type="submit"
              >
                Sign Up
              </Button>
              <span className="text-xs flex gap-2 justify-end">
                Already registered?{" "}
                <button
                  className="text-violet-400 font-semibold"
                  onClick={() => setIsRegistered(!isRegistered)}
                >
                  Sign in
                </button>
              </span>
            </div>
          </form>
        </>
      </div>
    </>
  );
}
