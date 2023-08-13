import "./globals.css";
import { Roboto } from "next/font/google";
import NavBar from "@/components/Nav/NavBar";
import QueryWrapper from "./queryWrapper";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Next.js party planner",
  description: "Financial planner for making on the rocks parties.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} max-w-[1475px] mx-auto`}>
        <QueryWrapper>
          <NavBar />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
