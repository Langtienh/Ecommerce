"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../ui/button";

export default function BackButton() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Button
      onClick={handleClick}
      variant="link"
      className="bg-white bg-opacity-15 rounded-xl text-white"
    >
      <FaArrowLeft size={24} className="size-6" />
    </Button>
  );
}
