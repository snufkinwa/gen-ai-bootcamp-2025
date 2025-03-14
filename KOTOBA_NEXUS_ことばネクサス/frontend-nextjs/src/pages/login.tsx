import Head from "next/head";
import AuthContainer from "@/components/auth/auth-container";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | KOTOBA NEXUS</title>
        <meta name="description" content="Login to your KOTOBA NEXUS account" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <AuthContainer />
      </div>
    </>
  );
}
