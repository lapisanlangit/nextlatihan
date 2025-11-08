import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">My App</Link>
        <ul>
          <li>
            <Link href="/beranda">Beranda</Link>
          </li>
          <li>
            <Link href="/beranda/jenis">Jenis</Link>
          </li>
          <li>
            <Link href="/beranda/lainnya">Lainnya</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
