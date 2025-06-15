import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";


const savate = Fira_Sans({
  subsets : ['greek'],
  weight : ['400'],
})

export const metadata: Metadata = {
  title: "PANEO",
  description: "A Dashboard with different widgets to assist you in your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={savate.className}
      >
        {children}
      </body>
    </html>
  );
}
