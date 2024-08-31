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
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:w-[20%] md:pt-24">
        <Search />
      </div>
      <main className="md:ml-[20%] min-h-screen gap-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}
