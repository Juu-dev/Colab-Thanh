import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ButtonStyle } from "@-styles";
import { postRegisterUser } from "@-utils/api";
import { RegisterParams } from "@-utils/types";

import { NameField } from "./NameField";
import { PasswordField } from "./PasswordField";
import { UsernameField } from "./UsernameField";
import styles from "../index.module.scss";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>({ reValidateMode: "onBlur" });

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterParams) => {
    console.log(data);
    try {
      await postRegisterUser(data);
      navigate("/login");
      toast.clearWaitingQueue();
      toast("Account created!", { type: "success", icon: true });
    } catch (err) {
      console.log(err);
      toast.clearWaitingQueue();
      toast("Error creating user", { type: "error", icon: true });
    }
  };

  const formFieldProps = { errors, register };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UsernameField {...formFieldProps} />
      <NameField {...formFieldProps} />
      <PasswordField {...formFieldProps} />
      <ButtonStyle className={styles.button}>Create My Account</ButtonStyle>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
