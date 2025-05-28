import "./globals.css";

import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-[#161727]">
        <SideBar />            

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
