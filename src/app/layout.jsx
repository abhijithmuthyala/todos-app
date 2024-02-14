import "@/styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const font = Josefin_Sans({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-neutral-100 font-josefin-sans text-sm text-neutral-800">
        {children}
      </body>
    </html>
  );
}
