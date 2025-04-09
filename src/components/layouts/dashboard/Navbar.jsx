import Icon from '@/components/ui/Icon'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className='fixed top-0 z-50 flex justify-between w-full px-12 bg-white shadow-md py-7'>
      <figure>
        <img src="/src/assets/logo/klinik-putri.png" className='' alt="logo klinik putri" width={70} />
      </figure>
      <Menu>
        <MenuButton>
          <div className='flex items-center gap-2'>
            <img src={auth.user.foto ? `http://localhost:5000/uploads/patient/${auth.user.foto}` : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} className='object-cover object-center bg-red-500 rounded-full' alt={`foto profil ${auth.user.name}`} width={50} />
            <Icon name="arrow-down" className="w-4 h-4 text-gray-500" />
          </div>
        </MenuButton>
        <MenuItems anchor="bottom end" className="bg-white shadow-md p-[30px] rounded-lg space-y-2 z-50 capitalize">
          <MenuItem>
            <Link to="/admin/profil" className="block data-[focus]:bg-green-100">
              profil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/" className="block data-[focus]:bg-green-100">
              website utama
            </Link>
          </MenuItem>
          <MenuItem>
            <button type='button' onClick={handleSignOut} className="block data-[focus]:bg-green-100">
              keluar
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>


    </nav>
  )
}

export default Navbar