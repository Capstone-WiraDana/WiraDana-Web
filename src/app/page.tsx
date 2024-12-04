import Navbar from '@/components/navbar.lp';
import Header from '@/components/header.lp';
import Content from '@/components/content.lp';
import About from '@/components/about.lp';
import Footer from '@/components/footer.lp';

export default function Home() {
  return (
    <main>
      <div className='mb-20'>
        <Navbar />
      </div>
      <Header />
      <Content />
      <About />
      <Footer />
    </main>
  );
}
