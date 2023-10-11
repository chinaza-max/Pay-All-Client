import React ,{useState} from 'react';
import Nav from '../Nav/Nav';
import SideBarLeft from '../sideBarLeft/sideBarLeft';


export default function Container1() {
    const [openMenu,setOpenMenu] =useState(false)

    function openFunc(val){
        setOpenMenu(val)
    }

  return (
    <>
        <Nav openFuncP={openFunc}/>
        <SideBarLeft openMenuP={openMenu} openFuncP={openFunc} />
    </>
  )
}
