import React from 'react'
import { NavLink } from 'react-router-dom';
import { menuLinks } from './menu';

export const SideMenu = () => {
   return (
      <div className="side-menu">
         {
            menuLinks.map(link => {
               return <NavLink to={link.url} className="menu-link" key={link.id}>{link.image}</NavLink>
            })
         }
      </div>
   )
}


