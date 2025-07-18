import { Footer } from "./components/Footer";
import { FormCard } from "./components/FormCard";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Header />
      <FormCard />
      <Footer />
    </div>
  );
}
