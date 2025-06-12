import { SignInButton } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';

const LoginButton = () => {
  return (
    <>
      <Button variant={'outline'} asChild>
        <SignInButton forceRedirectUrl={window.location.pathname + window.location.search} mode="modal">
          Login
        </SignInButton>
      </Button>
    </>
  );
};
export default LoginButton;
