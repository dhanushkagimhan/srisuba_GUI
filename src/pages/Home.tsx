import MainLayout from "../utility/components/mainLayout/MainLayout";
import HomeMenu from "../utility/components/navMenus/home/HomeMenu";

export default function Home() {
  return (
    <MainLayout navMenu={<HomeMenu />} showMarketing={true}>
      <div>sdfa</div>
    </MainLayout>
  );
}
