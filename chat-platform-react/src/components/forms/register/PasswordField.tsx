import { FC, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import {
  InputContainerStyle,
  InputLabelStyle,
  InputFieldStyle,
  InputContainerHeaderStyle,
  InputErrorStyle,
} from "@-styles";
import { RegisterFormFieldProps } from "@-utils/types";

import styles from "../index.module.scss";

export const PasswordField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainerStyle>
      <InputContainerHeaderStyle>
        <InputLabelStyle htmlFor="password">Password</InputLabelStyle>
        {errors.password && (
          <InputErrorStyle>{errors.password.message}</InputErrorStyle>
        )}
      </InputContainerHeaderStyle>
      <div className={styles.passwordContainer}>
        <InputFieldStyle
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
            maxLength: {
              value: 32,
              message: "Max characters is 32",
            },
          })}
        />
        {showPassword ? (
          <AiFillEyeInvisible
            size={24}
            onClick={() => setShowPassword(false)}
            cursor="pointer"
          />
        ) : (
          <AiFillEye
            size={24}
            onClick={() => setShowPassword(true)}
            cursor="pointer"
          />
        )}
      </div>
    </InputContainerStyle>
  );
};
