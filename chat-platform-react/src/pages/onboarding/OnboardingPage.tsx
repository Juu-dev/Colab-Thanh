import { OnboardingForm } from "@-components/forms/OnboardingForm";
import { PageStyle } from "@-styles/common.style";

export const OnboardingPage = () => {
  return (
    <PageStyle display="flex" justifyContent="center" alignItems="center">
      <OnboardingForm />
    </PageStyle>
  );
};
