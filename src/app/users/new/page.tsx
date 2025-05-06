'use client';

import Register from "@/components/Register";
import Link from "next/link";

export default function NewUserPage() {
    return (
        <div className="w-[870px] mx-auto">
            <div className="flex justify-between items-center mt-[153px] mb-[25px]">
                <h1 className="text-[24px] text-[var(--user-gray)] font-bold">Novo Usuário</h1>
                <Link
                    href="/user"
                    className="px-4 py-2 border border-[var(--light-purple)] text-[var(--light-purple)] text-[14px] uppercase rounded-[21px] font-bold hover:bg-[var(--intense-light-gray)] transition-colors"
                >
                    Voltar para lista
                </Link>
            </div>

            <Register redirectPath="/user" />
        </div>
    );
}