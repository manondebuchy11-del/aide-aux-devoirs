import "./globals.css";
import "./helper.css";

export const metadata = {
  title: "Réussite+ | Aide aux devoirs",
  description: "Des explications simples, des cours et des exercices gratuits pour progresser du CP à la 3e.",
  alternates: {
    canonical: "https://aide-aux-devoirs-dusky.vercel.app/"
  },
  verification: {
    google: "hyatuXNqlwTrhpXvwuLbORgS8TpGHMB9iQVrdRzmSew"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
