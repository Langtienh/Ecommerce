import { Button } from "@/components/ui/button";
import Image from "next/image";

const providers = [
  {
    label: "google",
    image: "/images/logo/google.png",
  },
  {
    label: "github",
    image: "/images/logo/github.png",
  },
];

export default function LoginProvider() {
  return (
    <div className="h-14 flex items-center justify-between gap-10">
      {providers.map((provider) => (
        <Button
          key={provider.label}
          className="text-base gap-3"
          variant="ghost"
        >
          <Image
            width={24}
            height={24}
            alt={provider.label}
            src={provider.image}
            className="size-6 rounded-full text-base"
          />
          <span className="capitalize">{provider.label}</span>
        </Button>
      ))}
    </div>
  );
}
