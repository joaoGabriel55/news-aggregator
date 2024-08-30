import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Search } from "@/components/shared/search";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8 grid md:grid-cols-[240px_1fr] gap-8">
        <div className="hidden md:block">
          <Search />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
