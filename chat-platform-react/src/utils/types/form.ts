import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

import { RegisterParams } from "./users.type";

export type RegisterFormFieldProps = {
  register: UseFormRegister<RegisterParams>;
  errors: FieldErrorsImpl<{
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }>;
};
