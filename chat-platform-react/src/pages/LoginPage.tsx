import { LoginForm } from "@-components/forms/login";
import { PageStyle } from "@-styles";

export const LoginPage = () => {
  return (
    <PageStyle display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </PageStyle>
  );
};
