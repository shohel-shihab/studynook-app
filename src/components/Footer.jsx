"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          
          {/* Left Section */}
          <div>
            <h3 className="text-2xl font-bold text-teal-700">
              StudyNook
            </h3>

            <p className="mt-4 text-sm text-gray-600">
              Find and book study rooms easily for focused
              learning and collaboration.
            </p>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>Email: support@studynook.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Useful Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-teal-700"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="text-gray-600 hover:text-teal-700"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-teal-700"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Follow Us
            </h4>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-teal-700 hover:text-teal-700"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-teal-700 hover:text-teal-700"
              >
                <FaXTwitter size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-teal-700 hover:text-teal-700"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-teal-700 hover:text-teal-700"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 border-t border-gray-300 pt-6">
          <div className="flex flex-col gap-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
            
            <p>
              © {currentYear} StudyNook Academic Systems.
              All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-teal-700"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="hover:text-teal-700"
              >
                Terms of Service
              </Link>

              <Link
                href="/campus-map"
                className="hover:text-teal-700"
              >
                Campus Map
              </Link>

              <Link
                href="/accessibility"
                className="hover:text-teal-700"
              >
                Accessibility
              </Link>

              <Link
                href="/contact"
                className="hover:text-teal-700"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}