import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "../components/header";
import { ThemeProvider } from "../components/ui/theme-provider";
import { dark } from "@clerk/themes";
import { checkUser } from "../lib/checkUser";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "SkillSync.ai",
  description: "",
};

export default async function RootLayout({ children }) {
  const dbUser = await checkUser();
  
  // Only pass serializable user data
  const userData = dbUser ? {
    id: dbUser.id,
    clerkUserId: dbUser.clerkUserId,
    name: dbUser.name,
    email: dbUser.email,
    imageUrl: dbUser.imageUrl,
  } : null;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={spaceGrotesk.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <Header user={userData} /> 
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by Suranjan Nandi</p>
              </div>
            </footer>
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}