import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Auth from "./auth";

const menuItems = [
  {
    label: (
      <>
        Gọi mua hàng <br /> 1800.2097
      </>
    ),
    path: "tel:18002044",
    image: "/images/header/phone.svg",
    isHiddenOnMobile: true,
  },
  {
    label: (
      <>
        Cửa hàng <br /> gần bạn
      </>
    ),
    path: "/about",
    image: "/images/header/location.svg",
    isHiddenOnMobile: true,
  },
  {
    label: (
      <>
        Tra cứu <br /> đơn hàng
      </>
    ),
    path: "/smember/invoices",
    image: "/images/header/car.svg",
    isHiddenOnMobile: true,
  },
  {
    label: (
      <>
        Giỏ <br /> hàng
      </>
    ),
    path: "/cart",
    image: "/images/header/cart.svg",
    isHiddenOnMobile: false,
  },
];

export default function Menu() {
  return (
    <>
      {menuItems.map((item, index) => (
        <Link
          href={item.path}
          key={`${item}${index}`}
          className={cn(
            "flex gap-2 items-center shrink-0 p-2 rounded-xl hover:bg-white hover:bg-opacity-10",
            item.isHiddenOnMobile && "hidden lg:flex"
          )}
        >
          <Image
            width={24}
            height={24}
            alt={item.path}
            src={item.image}
            className="h-6 shrink-0 object-cover"
          />
          <p className="text-xs">{item.label}</p>
        </Link>
      ))}
      <Auth />
    </>
  );
}
