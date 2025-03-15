import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative border-t">
      {/* Theme-aware background - dark in light mode, light in dark mode */}
      <div className="absolute inset-0 bg-[url('/dark-cta.png')] dark:bg-[url('/cta.png')] opacity-25 dark:opacity-30 bg-fill bg-center" />

      {/* Content remains at 100% opacity */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="mb-4">
              <Image
                src="/logonav.svg"
                alt="KOTOBA NEXUS Logo"
                width={150}
                height={60}
                className="mb-2"
              />
            </h3>
            <p className="text-foreground/80">
              Master Japanese through AI-powered interactive lessons tailored to
              your learning style.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/kana-game"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Kana Writing Game
                </Link>
              </li>
              <li>
                <Link
                  href="/pronunciation"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Pronunciation Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/visual-novel"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Visual Novel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Learning Path
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-foreground/80 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                support@kotoba-nexus.com
              </li>
              <li className="text-foreground/80 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} KOTOBA NEXUS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
