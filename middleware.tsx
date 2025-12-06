import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("my_secret_key");

export async function middleware(req: NextRequest) {
  //return NextResponse.redirect(new URL("/login", req.url));
  // const login = req.cookies.get("login")?.value;
  //
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  //
  // try {
  //   //    await jwtVerify(token, SECRET);
  //   if (login == "1") {
  //     console.log("cek auth");
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // } catch {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}

export const config = {
  matcher: ["/beranda/:path*"],
};
