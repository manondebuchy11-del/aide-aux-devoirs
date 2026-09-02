import "./globals.css";

export const metadata = {
  title: "Réussite+ | Aide aux devoirs",
  description: "Des explications simples et des exercices pour progresser du CP à la 3e."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
