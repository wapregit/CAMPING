import { Tent } from 'lucide-react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to={'/'} className="mr-4 flex items-center gap-2 text-nowrap text-sm font-medium lg:mr-6">
      <Tent />
      <p>LIKE CAMP HEE</p>
    </Link>
  );
};
export default Logo;
