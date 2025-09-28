import AuthHeader from "@/app/components/AuthHeader"; 
import Footer from "@/app/components/Footer";       
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />      
 
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>

      <Footer />
    </div>
  );
}