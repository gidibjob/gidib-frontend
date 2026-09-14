import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <Image
        src="/logo-gidib.jpeg"
        alt="GIDIB — Grupo de Inovação e Desenvolvimento da Indústria Brasileira"
        width={44}
        height={44}
        priority
        className="h-11 w-11 rounded-md object-cover"
      />
      <span className="text-lg font-extrabold tracking-tight text-gidib-navy">
        GIDIB
      </span>
    </Link>
  );
}
