"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Find a Room",
      href: "/",
    },
    {
      label: "My Bookings",
      href: "/bookings",
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
                className={`relative text-sm font-medium transition-colors ${
                  isActive(item.href)
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
        <div className="flex items-center gap-3">
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              as={Link}
              href="/login"
              variant="light"
              radius="sm"
            >
              Login
            </Button>

            <Button
              as={Link}
              href="/register"
              color="primary"
              radius="sm"
            >
              Register
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
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen
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
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
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