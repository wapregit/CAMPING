import { SignedIn, SignedOut } from '@clerk/clerk-react';

import DropdownListMenu from './DropdownListMenu';
import LoginButton from './LoginButton';
import Logo from './Logo';
import NavItems from './NavItems';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <div className="flex h-14 items-center gap-2 md:gap-4">
      <div className="mr-4 flex flex-row">
        <Logo />
        <nav className="flex items-center gap-4 text-sm xl:gap-6">
          <NavItems />
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4 md:flex-1 md:justify-end xl:gap-6">
        <Searchbar />
        <SignedIn>
          <DropdownListMenu />
        </SignedIn>
        <SignedOut>
          <LoginButton />
        </SignedOut>
      </div>
    </div>
  );
};
export default Navbar;
