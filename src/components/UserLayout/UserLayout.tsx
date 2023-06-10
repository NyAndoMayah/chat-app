import UserAppBar from '@/components/UserLayout/AppBar';
import Sidebar from '@/components/UserLayout/Sidebar';
type UserLayoutProps = {
  mainElements: React.ReactNode;
};
const UserLayout = (props: UserLayoutProps) => {
  return (
    <div>
      <UserAppBar />
      <Sidebar mainElement={props.mainElements} />
    </div>
  );
};
export default UserLayout;
