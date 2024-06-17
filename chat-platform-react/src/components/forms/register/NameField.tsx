import { FC } from "react";

import {
  InputContainerStyle,
  InputLabelStyle,
  InputFieldStyle,
  InputContainerHeaderStyle,
  InputErrorStyle,
} from "@-styles";
import { RegisterFormFieldProps } from "@-utils/types";

import styles from "../index.module.scss";

export const NameField: FC<RegisterFormFieldProps> = ({ register, errors }) => {
  return (
    <section className={styles.nameFieldRow}>
      <InputContainerStyle>
        <InputContainerHeaderStyle>
          <InputLabelStyle htmlFor="firstName">First Name</InputLabelStyle>
          {errors.firstName && (
            <InputErrorStyle>{errors.firstName.message}</InputErrorStyle>
          )}
        </InputContainerHeaderStyle>
        <InputFieldStyle
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "First Name is Required",
            minLength: 2,
            maxLength: 32,
          })}
        />
      </InputContainerStyle>
      <InputContainerStyle>
        <InputContainerHeaderStyle>
          <InputLabelStyle htmlFor="lastName">Last Name</InputLabelStyle>
          {errors.lastName && (
            <InputErrorStyle>{errors.lastName.message}</InputErrorStyle>
          )}
        </InputContainerHeaderStyle>
        <InputFieldStyle
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "Last Name is Required",
            minLength: 2,
            maxLength: 32,
          })}
        />
      </InputContainerStyle>
    </section>
  );
};
