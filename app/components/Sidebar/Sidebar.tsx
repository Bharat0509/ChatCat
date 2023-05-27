import getCurrentUser from "@/app/actions/getCurrentUser";
import DeskTopSidebar from "./DeskTopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();
    return (
        <div className='h-full'>
            <DeskTopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className='lg:pl-20 h-full'>{children}</main>
        </div>
    );
}
export default Sidebar;
