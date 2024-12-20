import LayoutLp from '@/components/layouts/layout.lp';
import Header from '@/components/header.lp';
import Content from '@/components/content.lp';
import About from '@/components/about.lp';
import Footer from '@/components/footer.lp';

export const metadata = {
  title: 'WiraDana | Beranda',
};

export default function Home() {
  return (
    <main>
      <LayoutLp>
        <Header />
        <Content />
        <About />
        <Footer />
      </LayoutLp>
    </main>
  );
}
