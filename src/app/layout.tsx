import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { RouteTransition } from "@/components/ui/RouteTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo Inteligente",
  description: "Vitrine inteligente para microlojistas venderem melhor no WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <RouteTransition>{children}</RouteTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
