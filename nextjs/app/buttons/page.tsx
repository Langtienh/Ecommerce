import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="w-screen h-screen p-10 flex items-center justify-center gap-5 capitalize">
      <Button>primary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
    </div>
  );
}
