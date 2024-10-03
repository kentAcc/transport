import Link from "next/link";
import React from "react";
import ToogleMode from "./ToggleMode";
import MainNavLinks from "./MainNavLinks";
import Logo from "./Logo";

const MainNav = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-4     ">
        {/* Sección de Logo */}
        <div className="flex items-center">
          <Logo
            src="https://openai.com/favicon.ico"
            alt="Logo de la Empresa"
            width={50}
            height={50}
          />
          <span className="ml-2 text-xl font-bold">Transportes del Nayar</span>
        </div>
        <div className="flex justify-between gap-2">
          <MainNavLinks></MainNavLinks>
          <div className="flex items-center gap-2 ">
            <Link href="/">LogOut</Link>
            <ToogleMode></ToogleMode>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
