import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-0">
              <Image
                src="/logonav.svg"
                alt="KOTOBA NEXUS Logo"
                width={150}
                height={150}
              />
            </h3>
            <p className="text-muted-foreground">
              Master Japanese through AI-powered interactive lessons tailored to
              your learning style.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kana-game"
                  className="text-muted-foreground hover:text-primary"
                >
                  Kana Writing Game
                </Link>
              </li>
              <li>
                <Link
                  href="/pronunciation"
                  className="text-muted-foreground hover:text-primary"
                >
                  Pronunciation Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/visual-novel"
                  className="text-muted-foreground hover:text-primary"
                >
                  Visual Novel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Learning Path
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                support@kotoba-nexus.com
              </li>
              <li className="text-muted-foreground">+1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className=" mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} KOTOBA NEXUS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
