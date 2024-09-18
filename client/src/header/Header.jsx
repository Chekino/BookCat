import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./header.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
import icone from "../assets/icone2.png";

const navigation = [
  { name: "ACCUEIL", href: "/", current: true },
  { name: "CATALOGUE", href: "/catalogue", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <Disclosure as="nav" className="nav-color">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <a className="" href="/">
                <img alt="Your Company" src={icone} className="h-15 w-20" />
              </a>

              <div className="hidden sm:flex justify-center flex-1">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="ml-4 text-sm font-medium text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                  >
                    ACCUEIL
                  </Link>
                  <Link
                    to="/catalogue"
                    className="ml-4 text-sm font-medium text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                  >
                    CATALOGUE
                  </Link>
                  {user && user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="ml-4 text-sm font-medium text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                    >
                      ADMIN
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              {user && (
                <div>
                  <span className="text-black-300 px-3">{user.name}</span>
                  <button
                    onClick={handleClick}
                    className="ml-4 text-sm font-medium text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md button-nav"
                  >
                    DECONNEXION
                  </button>
                </div>
              )}
              {!user && (
                <Link
                  to="/authentification"
                  className="ml-4 text-sm font-medium text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md button-nav"
                >
                  S'IDENTIFIER
                </Link>
              )}

              {/* Profile dropdown 
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Profil
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Paramètre
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Déconnexion
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>*/}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default Header;
