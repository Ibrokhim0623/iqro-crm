import {
  Group,
  LayoutDashboardIcon,
  User2,
  BadgeDollarSign,
} from "lucide-react";

export const navbarLinks = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboardIcon /> },
  { name: "Guruhlar", path: "/groups", icon: <Group /> },
  { name: "O'quvchilar", path: "/students", icon: <User2 /> },
  { name: "To'lovlar", path: "/payments", icon: <BadgeDollarSign /> },
];
