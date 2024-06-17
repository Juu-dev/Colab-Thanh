import { RegisterForm } from "@-components/forms/register/index";
import { PageStyle } from "@-styles";

export const RegisterPage = () => {
  return (
    <PageStyle display="flex" justifyContent="center" alignItems="center">
      <RegisterForm />
    </PageStyle>
  );
};
