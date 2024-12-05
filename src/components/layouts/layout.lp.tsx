import Navbar from '../navbar.lp';

const LayoutLp = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='mb-20'>
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default LayoutLp;
