import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <Image
        src="/logo-gidib.jpeg"
        alt="GIDIB — Grupo de Inovação e Desenvolvimento da Indústria Brasileira"
        width={52}
        height={52}
        priority
        className="size-13 rounded-md object-cover"
      />
      <span className="text-xl font-extrabold tracking-tight text-gidib-navy">
        GIDIB
      </span>
    </Link>
  );
}
