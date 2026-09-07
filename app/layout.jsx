import "./globals.css";

export const metadata = {
  title: "Draconix Digital | Modern Technology & Commerce Solutions",
  description: "Draconix Digital provides web development, software development, app development, SEO, branding, and e-commerce solutions with Draconix Assistant FAQ support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-glow-1" aria-hidden="true"></div>
        <div className="ambient-glow-2" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
