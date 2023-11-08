import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "./Header";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "eCommerce Website",
  description: "An eCommerce site written using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className + " bg-white text-zinc-900"}>
        <Header />

        {children}
      </body>
    </html>
  )
};
