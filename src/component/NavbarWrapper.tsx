"use client";

import { usePathname } from "next/navigation";
import VisitorNavbar from "./VisitorNavbar";
import SmeNavbar from "./SmeNavbar";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If path starts with /sme, use SmeNavbar
  if (pathname.startsWith("/sme")) {
    return <SmeNavbar>{children}</SmeNavbar>;
  }

  // Default to VisitorNavbar
  return <VisitorNavbar>{children}</VisitorNavbar>;
}
