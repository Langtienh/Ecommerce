"use client";
import { FaUser } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Auth() {
  return (
    <Button
      variant="link"
      className="bg-white bg-opacity-15 rounded-xl text-white"
    >
      <FaUser size={24} className="size-6" />
    </Button>
  );
}
