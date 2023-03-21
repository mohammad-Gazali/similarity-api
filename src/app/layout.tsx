 // here we made a shortcut for this import in tsconfig.json file in "compilerOptions" --> "paths" attribute
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/utils/ui-components";
import { Providers, Navbar } from "@/components";
import { Toaster } from "@/components/ui/Toast";



const inter = Inter({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 antialiased", inter.className)}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        
        <Providers>
          <header>
            {/* @ts-expect-error ServerComponent */}
            <Navbar />
          </header>

          {children}

          <Toaster position="bottom-right" />

        </Providers>
        {/* Allow for more height on mobile devices */}
        <div className="md:h-6 h-40" />
      </body>
    </html>
  )
}
