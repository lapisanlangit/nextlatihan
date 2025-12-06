import { Provider } from "react-redux";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
import { AuthGuard } from "@/app/components/AuthGuard";
export default function Beranda({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
