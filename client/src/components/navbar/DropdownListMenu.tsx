import { Link } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu';
import { privateLinks } from '@/utils/Links';

import SignoutLink from './SignoutLink';
import UserIcon from './UserIcon';

const DropdownListMenu = () => {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {privateLinks.map((item, index) => {
            return (
              <DropdownMenuItem key={index} asChild>
                <Link to={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignoutLink />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownListMenu;
