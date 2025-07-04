
import { HomeIcon, CreditCardIcon } from "lucide-react";
import Index from "./pages/Index";
import LineProcessor from "./pages/LineProcessor";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "LINE Processor",
    to: "/line-processor",
    icon: <CreditCardIcon className="h-4 w-4" />,
    page: <LineProcessor />,
  },
];
