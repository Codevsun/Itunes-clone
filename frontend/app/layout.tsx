import "./globals.css";

import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { SearchProvider } from '../components/SearchContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <div className="flex h-screen bg-[#161727] overflow-hidden">
            <SideBar />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen">
              <Navbar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}