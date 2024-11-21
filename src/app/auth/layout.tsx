export default function Layout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main className="h-full bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   {children}
  </main>
 );
}
