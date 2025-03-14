import Head from "next/head";
import AuthContainer from "@/components/auth/auth-container";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up | KOTOBA NEXUS</title>
        <meta name="description" content="Create a new KOTOBA NEXUS account" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <AuthContainer />
      </div>
    </>
  );
}
