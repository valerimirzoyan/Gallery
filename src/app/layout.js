import './globals.css'

export const metadata = {
  title: "website-animated-design",
  description: "animated-design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
