import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  ButtonStyle,
  InputContainerStyle,
  InputFieldStyle,
  InputLabelStyle,
} from "@-styles";
import { postLoginUser } from "@-utils/api";
import { SocketContext } from "@-utils/context";
import { LoginParams } from "@-utils/types";

import styles from "../index.module.scss";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onSubmit = async (data: LoginParams) => {
    console.log(socket);
    console.log(socket.connected);
    try {
      await postLoginUser(data);
      console.log("Success");
      socket.connect();
      console.log(socket.connected);
      navigate("/conversations");
    } catch (err) {
      console.log(socket.connected);
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainerStyle>
        <InputLabelStyle htmlFor="username">Username</InputLabelStyle>
        <InputFieldStyle
          type="text"
          id="username"
          {...register("username", { required: true })}
        />
      </InputContainerStyle>
      <InputContainerStyle className={styles.loginFormPassword}>
        <InputLabelStyle htmlFor="password">Password</InputLabelStyle>
        <InputFieldStyle
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
      </InputContainerStyle>
      <ButtonStyle>Login</ButtonStyle>
      <div className={styles.footerText}>
        <span>Don't have an account? </span>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
};
