import "./globals.css";
import ClientShell from "./ClientShell";

export const metadata = {
  metadataBase: new URL("https://www.hexagonpadel.eu"),
  title: { default: "Hexagon Padel", template: "%s | Hexagon Padel" },
  applicationName: "Hexagon Padel",
  alternates: {
    canonical: "https://www.hexagonpadel.eu/",
  },
  icons: {
    icon: ["/favicon.ico", "/icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}