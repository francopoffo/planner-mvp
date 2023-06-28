import "./globals.css";
import { Roboto } from "next/font/google";
import NavBar from "@/components/Nav/NavBar";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Next.js fullstack app starter",
  description: "My starting project for fullstack apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} max-w-[1475px] mx-auto`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
