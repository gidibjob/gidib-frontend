import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Institucional",
    links: [
      { href: "/sobre", label: "Sobre a GIDIB" },
      { href: "/projetos", label: "Projetos" },
      { href: "/parceiros", label: "Parceiros" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { href: "/blog", label: "Blog e Notícias" },
      { href: "/eventos", label: "Eventos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gidib-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-gidib.jpeg"
                alt="GIDIB — Grupo de Inovação e Desenvolvimento da Indústria Brasileira"
                width={44}
                height={44}
                className="h-11 w-11 rounded-md object-cover"
              />
              <span className="text-lg font-extrabold tracking-tight">
                GIDIB
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              Grupo de Inovação e Desenvolvimento da Indústria Brasileira.
              Transformando o Brasil com a conscientização e qualificação dos
              profissionais da indústria verde e amarela.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white/90">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gidib-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} GIDIB — Grupo de Inovação e
            Desenvolvimento da Indústria Brasileira.
          </p>
          <p className="italic text-white/70">
            &ldquo;Conhecimento transforma pessoas. Pessoas transformam a
            indústria.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
