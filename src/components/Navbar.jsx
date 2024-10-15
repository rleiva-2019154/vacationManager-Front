import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/img/logoGeko.png";
import avatar from "../assets/img/avatar.png";
import { logout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  
];


const adminNavigation = [
  { name: "Inicio", href: "/" },
  { name: "Asignar rol", href: "/assignRole" },
  { name: "Ver solicitudes", href: "/viewRequests" },
  { name: "Equipos", href: "/teams" },
  { name: "Dias festivos", href: "/holidays" }
];

const bossNavigation = [
  { name: "Inicio", href: "/" },
  { name: "Solicitar", href: "/vacationRequest" },
  { name: "Mis solicitudes", href: "/MyVacationRequests" },
  { name: "Ver solicitudes", href: "/viewRequestForBoss" },
  { name: "Días disponibles", href: "/daysAviable" },
  { name: "Equipos", href: "/team" },
];

const employeeNavigation = [
  { name: "Inicio", href: "/" },
  { name: "Solicitar", href: "/vacationRequest" },
  { name: "Mis solicitudes", href: "/MyVacationRequests" },
  { name: "Días disponibles", href: "/daysAviable" },
  { name: "Equipo", href: "/team" },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setRole(user.role);
    }
  }, []);

  let authenticatedNavigation = [];
  if (role === "ADMIN") {
    authenticatedNavigation = adminNavigation;
  } else if (role === "BOSS") {
    authenticatedNavigation = bossNavigation;
  } else if (role === "EMPLOYEE") {
    authenticatedNavigation = employeeNavigation;
  }

  return (
    <Disclosure as="nav" className="bg-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Menú principal</span>
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
            <div className="flex flex-shrink-0 items-center">
              <img alt="Geko Digital" src={logo} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveItem(item.name)}
                    aria-current={
                      activeItem === item.current ? "page" : undefined
                    }
                    className={classNames(
                      activeItem === item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-500 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn &&
                  authenticatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setActiveItem(item.name)}
                      aria-current={
                        activeItem === item.current ? "page" : undefined
                      }
                      className={classNames(
                        activeItem === item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-500 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex flex-col items-center text-gray-300 hover:cursor-pointer hover:text-white px-3 py-2 text-sm font-medium">
                <span>{username}</span>
                <span className="text-xs text-gray-400">({role})</span>
              </div>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src={avatar} className="h-8 w-8 rounded-full" />
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
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <span
                      onClick={logout}
                      className="block px-4 py-2 text-sm hover:cursor-pointer text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a
                href="/auth"
                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={activeItem === item.current ? "page" : undefined}
              className={classNames(
                activeItem === item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-500 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {isLoggedIn &&
            authenticatedNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={activeItem === item.current ? "page" : undefined}
                className={classNames(
                  activeItem === item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-500 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
