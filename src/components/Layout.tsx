import bg from '../../public/images/login.png';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      {props.children}
    </div>
  );
}
