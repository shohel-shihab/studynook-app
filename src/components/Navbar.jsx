"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Avatar, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router =useRouter();
  const {
    data: session
  } = authClient.useSession()
  const user = session?.user;

  const handeLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  const navItems = [
    {
      label: "Find a Room",
      href: "/",
    },
    {
      label: "Add Room",
      href: "/add-room",
    },
    {
      label: "Resources",
      href: "/resources",
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-teal-700"
        >
          StudyNook
        </Link>

        {/* Desktop Center Menu */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${isActive(item.href)
                  ? "text-teal-700"
                  : "text-gray-600 hover:text-teal-700"
                  }`}
              >
                {item.label}

                {isActive(item.href) && (
                  <span className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-teal-700" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        {!user && <div className="flex items-center gap-3">

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              variant="light"
              radius="sm"
            >
              Login
            </Link>

            <Button
              color="primary"
              radius="sm"
            >
              <Link href={'/register'}>Register</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>}
        {user && <div>
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Avatar>
                <Avatar.Image
                  alt="Junior Garcia"
                  src={user?.image}
                />
                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">

                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">{user?.name}</p>
                    <p className="text-xs leading-none text-muted">{user?.email}</p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item id="dashboard" textValue="Dashboard">
                  <Label>Dashboard</Label>
                </Dropdown.Item>
                <Dropdown.Item id="profile" textValue="Profile">
                  <Label>Profile</Label>
                </Dropdown.Item>
                <Dropdown.Item onClick={handeLogOut} id="logout" textValue="Logout" variant="danger">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Log Out</Label>
                    <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>}
      </div>
      {/* dropdown menu  */}



      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen
          ? "max-h-[500px] border-t border-gray-200"
          : "max-h-0"
          }`}
      >
        <div className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive(item.href)
                ? "bg-teal-50 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-2">
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              fullWidth
              onPress={() => setIsMenuOpen(false)}
            >
              Login
            </Button>

            <Button
              as={Link}
              href="/register"
              color="primary"
              fullWidth
              onPress={() => setIsMenuOpen(false)}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}