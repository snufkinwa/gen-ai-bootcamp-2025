"use client";

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth-context";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import FeatureCards from "@/components/dashboard/feature-cards";
import RecentActivity from "@/components/dashboard/recent-activity";
import Loading from "@/components/loading";

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Student Dashboard | KOTOBA NEXUS</title>
        <meta
          name="description"
          content="Track your Japanese learning progress and access all learning tools"
        />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <DashboardHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            <FeatureCards />
          </div>
          <div className="space-y-8">
            <RecentActivity />
          </div>
        </div>
      </main>
    </>
  );
}
