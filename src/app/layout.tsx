import type { Metadata } from "next";
import { Anton, Darker_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dianet Adán — Product Designer & Visual Systems Thinker",
  description:
    "Portfolio of Dianet Adán, a Product Designer with a strong visual direction background. Product design, UX/UI, visual systems, brand identity and art direction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${darkerGrotesque.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
