import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const url = request.nextUrl.clone();
  const token = request.cookies.get('tasksDB_login');

  // Rutas que requieren autenticacion
  const protectedPaths = ['/tasks'];

  // Rutas accesibles solo para no autenticados
  const publicPaths = ['/auth/login', '/auth/register'];

  if (protectedPaths.some(path => url.pathname.startsWith(path))) {
    // Si el usuario intenta acceder a rutas protegidas sin token, redirigir al login
    if (!token) {
      url.pathname = '/auth/login'; // Redirigir al login
      return NextResponse.redirect(url);
    }
  }

  if (publicPaths.some(path => url.pathname.startsWith(path))) {
    // Si el usuario intenta acceder al login o registro con un token, redirigir al dashboard
    if (token) {
      url.pathname = '/tasks'; // Redirigir al dashboard
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/tasks', '/auth/:path*'],
}