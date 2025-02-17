import Footer from "./_footer/footer";
import Navbar from "./_navbar/navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
      <section className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </section>
    );
  }