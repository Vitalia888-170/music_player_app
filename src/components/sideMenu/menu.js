import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { MdAlbum, MdLibraryMusic } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";


export const menuLinks = [
   {
      id: 1,
      url: '/profile',
      image: <FaUserCircle />
   },
   {
      id: 2,
      url: '/playlists',
      image: <MdLibraryMusic />
   },
   {
      id: 3,
      url: '/artists',
      image: <GiMicrophone />
   },
   {
      id: 4,
      url: '/albums',
      image: <MdAlbum />
   },
   {
      id: 5,
      url: '/preferences',
      image: <IoHeartCircleOutline />
   },
   {
      id: 6,
      url: '/search',
      image: <BiSearch />
   },
]