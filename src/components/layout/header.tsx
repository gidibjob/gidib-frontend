"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/eventos", label: "Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/contato", label: "Contato" },
];

function SearchForm({
  autoFocus,
  onDone,
}: {
  autoFocus?: boolean;
  onDone: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const term = query.trim();
        router.push(term ? `/blog?q=${encodeURIComponent(term)}` : "/blog");
        setQuery("");
        onDone();
      }}
    >
      <Input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar artigos..."
        aria-label="Buscar artigos"
        className="focus-visible:border-gidib-green"
      />
      <Button
        type="submit"
        className="shrink-0 bg-gidib-green hover:bg-gidib-green-dark"
      >
        Buscar
      </Button>
    </form>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Fecha busca e menu ao navegar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Só a Home tem uma hero full-bleed por trás; nas demais páginas o topo já
  // é a faixa navy (PageHero), então o header entra sólido desde o início.
  const solid = scrolled || open || searchOpen || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground/70 transition-colors hover:text-gidib-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 xl:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label={searchOpen ? "Fechar busca" : "Buscar"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </Button>
          <Link
            href="/associe-se"
            className={buttonVariants({
              size: "sm",
              className:
                "btn-hero-primary ml-2 bg-gidib-green px-4 text-primary-foreground hover:bg-gidib-green-dark",
            })}
          >
            Associe-se
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {searchOpen && (
        <div className="hidden border-t border-border/60 bg-background xl:block">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <SearchForm autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border/60 bg-background px-4 pb-4 pt-2 xl:hidden">
          <div className="pb-2 pt-1">
            <SearchForm onDone={() => setOpen(false)} />
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-gidib-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/associe-se"
            onClick={() => setOpen(false)}
            className={buttonVariants({
              className:
                "mt-3 w-full bg-gidib-green text-primary-foreground hover:bg-gidib-green-dark",
            })}
          >
            Associe-se
          </Link>
        </div>
      )}
    </header>
  );
}
