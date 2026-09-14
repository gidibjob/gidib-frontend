import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gidib-navy text-sm font-black text-white">
        G
      </span>
      <span className="text-lg font-extrabold tracking-tight text-gidib-navy">
        GIDIB
      </span>
    </Link>
  );
}
