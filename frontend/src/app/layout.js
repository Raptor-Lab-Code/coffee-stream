import { Inter } from "next/font/google";
import "../../styles/globals.css";
import BaseGuestLayout from "../../layers/BaseGuestLayout";
import Navigator from "../../components/Navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, error }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex h-screen">
      <aside className="flex flex-col w-64 h-screen bg-gray-800">
        <div className="flex flex-col h-full shadow-lg">
          <div className="bg-blue-500 text-white p-5 text-lg font-bold">
            Coffee-Stream
          </div>
          <div className="flex-1 px-5 py-2 bg-blue-900">
            <Navigator />
          </div>
          <div className="bg-gray-900 text-white p-5 text-sm">
            © 2024 Axonite - All rights reserved
          </div>
        </div>
      </aside>
      <main className="flex flex-col flex-grow overflow-y-auto items-center justify-center">
        {children}
      </main>
    </div>
    </body>
    </html>
  );
}
