"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const genderLinks = [
    { label: "Hombres", path: "/gender/men" },
    { label: "Mujeres", path: "/gender/women" },
    { label: "Niños", path: "/gender/kid" }
  ];

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
  className={clsx(
    "fixed p-5 right-0 top-0 w-full sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
    {
      "translate-x-full": !isSideMenuOpen,
    }
  )}
>
  <IoCloseOutline
    size={50}
    className="absolute top-5 right-5 cursor-pointer"
    onClick={() => closeMenu()}
  />

  {/* Input */}
  <div className="relative mt-14">
    <IoSearchOutline size={20} className="absolute top-2 left-2" />
    <input
      type="text"
      placeholder="Buscar"
      className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
    />
  </div>

  {/* Enlaces de categoría de género - Solo para móviles */}
{/* Enlaces de categoría de género - Solo para móviles */}
<div className="mt-10 sm:hidden">
  <h3 className="text-xl font-semibold">Categorías</h3>
  {genderLinks.map((link) => (
    <Link
      href={link.path}
      onClick={() => closeMenu()}
      key={link.label}
      className="flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all"
    >
      <IoShirtOutline size={30} />
      <span className="ml-3 text-xl sm:text-lg">{link.label}</span>
    </Link>
  ))}
</div>


  {/* Menú de autenticación */}
  {isAuthenticated && (
    <>
      <Link
        href="/profile"
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoPersonOutline size={30} />
        <span className="ml-3 text-xl sm:text-lg">Perfil</span>
      </Link>

      <Link
        href="/orders"
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoTicketOutline size={30} />
        <span className="ml-3 text-xl sm:text-lg">Órdenes</span>
      </Link>
    </>
  )}

  {isAuthenticated && (
    <button
      className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      onClick={() => logout()}
    >
      <IoLogOutOutline size={30} />
      <span className="ml-3 text-xl sm:text-lg">Salir</span>
    </button>
  )}

  {!isAuthenticated && (
    <Link
      href="/auth/login"
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      onClick={() => closeMenu()}
    >
      <IoLogInOutline size={30} />
      <span className="ml-3 text-xl sm:text-lg">Ingresar</span>
    </Link>
  )}

  {/* Enlaces de administración */}
  {isAdmin && (
    <>
      <div className="w-full h-px bg-gray-200 my-10" />
      <Link
        href="/admin/products"
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoShirtOutline size={30} />
        <span className="ml-3 text-xl sm:text-lg">Productos</span>
      </Link>

      <Link
        href="/admin/orders"
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoTicketOutline size={30} />
        <span className="ml-3 text-xl sm:text-lg">Órdenes</span>
      </Link>

      <Link
        href="/admin/users"
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoPeopleOutline size={30} />
        <span className="ml-3 text-xl sm:text-lg">Usuarios</span>
      </Link>
    </>
  )}
</nav>

    </div>
  );
};

