import Icon from '@/components/ui/Icon';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link, useNavigate } from 'react-router-dom';
import KlinikPutriLogo from '@/assets/logo/klinik-putri.png';

const Navbar = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const user = auth?.user;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const defaultFoto =
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

  return (
    <nav className="fixed top-0 z-50 flex w-full justify-between bg-white px-12 py-7 shadow-md">
      <figure>
        <img
          src={KlinikPutriLogo}
          alt="logo klinik putri"
          width={70}
          className="object-cover object-center"
        />
      </figure>

      <Menu as="div" className="relative">
        <MenuButton>
          <div className="flex items-center gap-2">
            <img
              src={user?.fotoUrl || defaultFoto}
              onError={(e) => (e.target.src = defaultFoto)}
              alt=""
              width={50}
              className="h-[50px] w-[50px] rounded-full object-cover object-center"
            />
            <Icon name="arrow-down" className="h-4 w-4 text-gray-500" />
          </div>
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white p-4 shadow-lg z-50 space-y-2">
          <MenuItem>
            <Link to="/admin/profil" className="block data-[focus]:bg-green-100">
              Profil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/" className="block data-[focus]:bg-green-100">
              Website Utama
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              onClick={handleSignOut}
              className="block w-full text-left data-[focus]:bg-green-100"
            >
              Keluar
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  );
};

export default Navbar;
