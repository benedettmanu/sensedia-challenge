"use client";

import { User } from "@/components/User";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserListPage() {
  const searchParams = useSearchParams();
  const notification = searchParams.get("notification");
  const type = searchParams.get("type") || "success";

  const [showNotification, setShowNotification] = useState(!!notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen">
      <div className="w-[870px] mx-auto mt-[153px] flex justify-end items-center">
        <Link
          href="/users/new"
          className="w-[180px] h-[42px] bg-[var(--light-purple)] text-[var(--white)] text-[14px] uppercase rounded-[21px] font-bold flex items-center justify-center"
        >
          Novo Usuário
        </Link>
      </div>

      <User />

      {showNotification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white z-50`}
        >
          {notification}
        </div>
      )}
    </div>
  );
}
