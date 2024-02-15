import { ThemeProvider } from "@/components/theme";

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
    <html lang="en" className={`${font.className} overflow-y-scroll`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
