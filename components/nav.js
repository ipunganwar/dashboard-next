import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="border-2 text-lg font-semibold">
      <Link
        href="/products/"
        className={pathname == "/products" ? "active" : ""}
      >
        Products
      </Link>
      <Link href="/carts/" className={pathname == "/carts" ? "active" : ""}>
        Carts
      </Link>
    </div>
  );
}
