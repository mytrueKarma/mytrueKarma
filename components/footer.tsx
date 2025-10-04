"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/myk-logo.png"
                alt="mytrueKarma Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-white">mytrueKarma</span>
            </div>
            <div className="text-sm">
              <p className="mb-2">мүтʀueᴋaʀᴍa EST. 2021</p>
              <div className="space-y-1">
                <p>Aufm Hennekamp 96,</p>
                <p>40225 Düsseldorf</p>
                <p>Mon – Fr : 9:30 – 18:00</p>
                <p>+015678443874</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-blue-400 hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://www.facebook.com/mytruekarma"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-pink-400 hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://www.instagram.com/mytruekarma"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-green-400 hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/send?phone=4915678443874"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.961-1.843.144-.357.726-2.8.726-2.8.38.722 1.488 1.354 2.668 1.354 3.51 0 5.896-3.196 5.896-7.473 0-3.23-2.744-6.238-6.916-6.238-5.19 0-7.8 3.717-7.8 6.817 0 1.878.712 3.55 2.237 4.182.25.103.38.058.44-.158.044-.166.146-.583.193-.762.064-.246.04-.333-.138-.547-.395-.465-.647-1.05-.647-1.889 0-2.433 1.822-4.612 4.742-4.612 2.587 0 4.007 1.579 4.007 3.69 0 2.775-1.228 5.12-3.054 5.12-.987 0-1.727-.816-1.489-1.818.285-1.194 1.038-2.48 1.038-3.343 0-.77-.413-1.414-1.27-1.414-1.007 0-1.816.904-1.816 2.115 0 .771.26 1.293.26 1.293s-.876 3.714-.103 4.119c.185.097.37.003.493-.25z" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Sitemap */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Sitemap</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/"
                className="block hover:text-blue-400 transition-colors"
              >
                Startseite
              </Link>
              <Link
                href="/shop"
                className="block hover:text-blue-400 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block hover:text-blue-400 transition-colors"
              >
                Dienstleistungen
              </Link>
              <Link
                href="/seller/dashboard"
                className="block hover:text-blue-400 transition-colors"
              >
                Verkäufer-Dashboard
              </Link>
              <Link
                href="/blog"
                className="block hover:text-blue-400 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Engagement */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">
              Social Engagement
            </h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block hover:text-blue-400 transition-colors"
              >
                Wer steckt dahinter?
              </Link>
              <Link
                href="/transparency"
                className="block hover:text-blue-400 transition-colors"
              >
                Projekte & Transparenz
              </Link>
              <Link
                href="/talent"
                className="block hover:text-blue-400 transition-colors"
              >
                Nachwuchs- & Talentförderung
              </Link>
            </div>
          </div>

          {/* Informationen */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Informationen</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/datenschutz"
                className="block hover:text-blue-400 transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                href="/widerruf"
                className="block hover:text-blue-400 transition-colors"
              >
                Widerrufsrecht
              </Link>
              <Link
                href="/impressum"
                className="block hover:text-blue-400 transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/agb"
                className="block hover:text-blue-400 transition-colors"
              >
                AGB
              </Link>
              <Link
                href="/kontakt"
                className="block hover:text-blue-400 transition-colors"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              COPYRIGHT 2024 © mytrueKarma
            </div>
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>Ein Projekt für nachhaltigen und transparenten Handel</p>
              <p>Made with ❤️ in Düsseldorf</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
