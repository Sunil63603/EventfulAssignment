"use client";

//shadcn components
import { Button } from "@/components/ui/button";

//NextJS imports
import Link from "next/link";
import { usePathname } from "next/navigation";

//React hooks
import { useState } from "react";

export default function Layout({ children }) {
  //Hooks used👇
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); //to open dropdown using 'Hamburger' icon
  const pathname = usePathname();

  //variable to indicate current active button in navbar at the top
  const isActive = (path) => pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Artist Booking</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/listing">
            <Button
              variant={isActive("/listing") ? "default" : "outline"}
              className={isActive("/listing") ? "bg-blue-600 text-white" : ""}
            >
              Artists
            </Button>
          </Link>
          <Link href="/onboard">
            <Button
              variant={isActive("/onboard") ? "default" : "outline"}
              className={isActive("/onboard") ? "bg-blue-600 text-white" : ""}
            >
              Onboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant={isActive("/dashboard") ? "default" : "outline"}
              className={isActive("/dashboard") ? "bg-blue-600 text-white" : ""}
            >
              Dashboard
            </Button>
          </Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        {/* For smaller screen size, buttons will be replaced with Hamburger icon */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-t">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/listing">
              <Button
                variant={isActive("/listing") ? "default" : "outline"}
                className={`w-full justify-start ${
                  isActive("/listing") ? "bg-blue-600 text-white" : ""
                }`}
              >
                Artists
              </Button>
            </Link>
            <Link href="/onboard">
              <Button
                variant={isActive("/onboard") ? "default" : "outline"}
                className={`w-full justify-start ${
                  isActive("/onboard") ? "bg-blue-600 text-white" : ""
                }`}
              >
                Onboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "default" : "outline"}
                className={`w-full justify-start ${
                  isActive("/dashboard") ? "bg-blue-600 text-white" : ""
                }`}
              >
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 px-4 py-2 text-center">
        &copy; {new Date().getFullYear()} Artist Bookings
      </footer>
    </div>
  );
}
