import Nav from "./nav";
import Filters from "./products/filters";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const pathname = usePathname();

  const filter = useSelector((state) => {
    return state.filter;
  });

  return (
    <div className="sidebar bg-white fixed w-56">
      <Nav />
      <div className="overflow-auto h-full">
        {pathname && pathname === "/products" ? <Filters {...filter} /> : <></>}
      </div>
    </div>
  );
}
