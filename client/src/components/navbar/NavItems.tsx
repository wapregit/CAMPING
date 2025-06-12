import { Link } from 'react-router';

import { publicLinks } from '@/utils/Links';

const NavItems = () => {
  return (
    <>
      {publicLinks.map((item, index) => {
        return (
          <Link key={index} to={item.href}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
};
export default NavItems;
