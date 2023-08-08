import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="border-2">
      <Link
        href="/products/"
        className={pathname == "/products" ? "active" : ""}
      >
        Products
      </Link>
      <Link href="/carts/">Carts</Link>
    </div>
  );
}
