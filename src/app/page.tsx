import { Banner } from "@/components/Banner";
import Register from "@/components/Register";
import { User } from "@/components/User";

export default function Home() {
  return (
    <div>
      <Banner />
      <User />
      <Register />
    </div>
  );
}