import { AxiosError } from "axios";
import { FC } from "react";

import {
  InputContainerStyle,
  InputContainerHeaderStyle,
  InputErrorStyle,
  InputFieldStyle,
  InputLabelStyle,
} from "@-styles";
import { checkUsernameExists } from "@-utils/api";
import { RegisterFormFieldProps } from "@-utils/types";

export const UsernameField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  console.log("Username Errors: ", errors.username);
  return (
    <InputContainerStyle>
      <InputContainerHeaderStyle>
        <InputLabelStyle htmlFor="username">Username</InputLabelStyle>
        {errors.username && (
          <InputErrorStyle>{errors.username.message}</InputErrorStyle>
        )}
      </InputContainerHeaderStyle>
      <InputFieldStyle
        type="text"
        id="username"
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Must be 3 characters long",
          },
          maxLength: {
            value: 16,
            message: "Exceeds 16 characters",
          },
          validate: {
            checkUsername: async (username: string) => {
              try {
                await checkUsernameExists(username);
              } catch (err) {
                return (
                  (err as AxiosError).response?.status === 409 &&
                  "Username already exists"
                );
              }
            },
          },
        })}
      />
    </InputContainerStyle>
  );
};
