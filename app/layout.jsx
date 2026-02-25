import "./globals.css";

export const metadata = {
  title: "Alex.dev — Full-Stack Software Engineer",
  description: "Alex is a Full-Stack Software Engineer building scalable and elegant web solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
