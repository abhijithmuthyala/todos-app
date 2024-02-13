import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">{children}</body>
    </html>
  );
}
