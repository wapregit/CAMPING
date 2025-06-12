import { SignOutButton } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';

const SignoutLink = () => {
  return (
    <SignOutButton redirectUrl="/">
      <button className="dropdownButton gap-2.5">
        <LogOut /> Log out
      </button>
    </SignOutButton>
  );
};

export default SignoutLink;
