import Footer from "../components/footer/page";
import Header from "../components/header/page";

export default function Beranda({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
