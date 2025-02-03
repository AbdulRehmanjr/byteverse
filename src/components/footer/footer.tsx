import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const footerSections = [
    {
      title: "STACK OVERFLOW",
      links: [
        { text: "Questions", href: "/questions" },
        { text: "Help", href: "/help" },
        { text: "Chat", href: "/chat" },
      ],
    },
    {
      title: "PRODUCTS",
      links: [
        { text: "Teams", href: "/teams" },
        { text: "Advertising", href: "/advertising" },
        { text: "Talent", href: "/talent" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { text: "About", href: "/about" },
        { text: "Press", href: "/press" },
        { text: "Work Here", href: "/work-here" },
        { text: "Legal", href: "/legal" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Contact Us", href: "/contact" },
        { text: "Cookie Settings", href: "/cookie-settings" },
        { text: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
    {
      title: "STACK EXCHANGE NETWORK",
      links: [
        { text: "Technology", href: "/technology" },
        { text: "Culture & recreation", href: "/culture" },
        { text: "Life & arts", href: "/life" },
        { text: "Science", href: "/science" },
        { text: "Professional", href: "/professional" },
        { text: "Business", href: "/business" },
        { text: "API", href: "/api" },
        { text: "Data", href: "/data" },
      ],
    },
  ];

  const socialLinks = [
    { text: "Blog", href: "#" },
    { text: "Facebook", href: "#" },
    { text: "Twitter", href: "#" },
    { text: "LinkedIn", href: "#" },
    { text: "Instagram", href: "#" },
  ];

  return (
    <footer className="bg-[#232629] py-8 text-gray-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Stack Overflow"
                  fill
                  sizes="100%"
                />
              </div>
            </Link>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h5 className="text-xs font-bold text-gray-400">
                {section.title}
              </h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="text-sm hover:text-white">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex gap-4 text-sm">
              {socialLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="text-gray-400 hover:text-white"
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Site design / logo © 2025 Stack Exchange Inc; user contributions
              licensed under{" "}
              <Link href="#" className="text-gray-400 hover:text-white">
                CC BY-SA
              </Link>
              , rev 2025.1.31.21881
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
