import { MdGridView, MdOutlineGroups, MdOutlineInventory2, MdOutlineSettings } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import { FaInbox, FaTableCells } from "react-icons/fa6";
import { IoLayers } from "react-icons/io5";

export const navItems = [
  { label: "Overview", icon: MdGridView, active: true },
  { label: "Analytics", icon: GoGraph },
  { label: "Inventory", icon: MdOutlineInventory2 },
  { label: "Customers", icon: MdOutlineGroups },
  { label: "Notification", icon: FaBell },
  { label: "Inbox", icon: FaInbox },
  { label: "Integrations", icon: IoLayers },
  { label: "Products", icon: FaTableCells },
  { label: "Settings", icon: MdOutlineSettings },
];
