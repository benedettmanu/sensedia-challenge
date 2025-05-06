'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import ProfileIcon from '@/assets/header/avatar.svg';
import { User } from '@/models/User';

export default function UserProfile() {
    const params = useParams();
    const username = params.username as string;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                console.log(username)
                const response = await fetch(`/api/users/${username}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Usuário não encontrado');
                    }
                    throw new Error('Erro ao carregar dados do usuário');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                console.error('Erro ao buscar perfil:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserProfile();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="w-[870px] mx-auto mt-[153px]">
                <div className="animate-pulse">
                    <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
                    <div className="flex gap-6">
                        <div className="w-32 h-32 rounded-full bg-gray-200"></div>
                        <div className="flex-1">
                            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 w-64 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 w-72 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 w-56 bg-gray-200 rounded mb-3"></div>
                        </div>
                    </div>
                    <div className="h-12 w-full bg-gray-200 rounded mt-8"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[870px] mx-auto mt-[20px] flex flex-col items-center">
                <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">
                    {error}
                </h1>
                <p className="text-[var(--gray)] mb-6">
                    O perfil que você está procurando não foi encontrado ou não está disponível.
                </p>
                <Link
                    href="/user"
                    className="w-[180px] h-[42px] bg-[var(--light-purple)] text-[var(--white)] text-[14px] uppercase rounded-[21px] font-bold flex items-center justify-center"
                >
                    Ver todos usuários
                </Link>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const weekdaysMap: Record<string, string> = {
        '0': 'Segunda',
        '1': 'Terça',
        '2': 'Quarta',
        '3': 'Quinta',
        '4': 'Sexta',
        '5': 'Sábado',
        '6': 'Domingo'
    };

    const formattedWeekdays = (user.weekdays?.split(',') ?? [])
        .map(day => weekdaysMap[day.trim()] || day.trim())
        .join(', ');


    return (
        <div className="w-[870px] mx-auto mt-[20px]">
            <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">
                Perfil do Usuário
            </h1>

            <div className="w-full border border-[var(--table-gray)] rounded-[10px] p-8">
                <div className="flex gap-8">
                    <div className="w-[120px] h-[120px] bg-[var(--intense-light-gray)] rounded-full flex items-center justify-center">
                        <Image
                            src={ProfileIcon}
                            alt="Foto de perfil"
                            width={80}
                            height={80}
                            className="text-[var(--gray)]"
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-[20px] font-bold text-[var(--user-gray)] mb-2">
                            {user.name}
                        </h2>
                        <p className="text-[var(--gray)] mb-2">
                            <span className="font-bold">Username:</span> {username}
                        </p>
                        <p className="text-[var(--gray)] mb-2">
                            <span className="font-bold">Email:</span> {user.email}
                        </p>
                        <p className="text-[var(--gray)] mb-2">
                            <span className="font-bold">Cidade:</span> {user.city}
                        </p>
                        <p className="text-[var(--gray)] mb-2">
                            <span className="font-bold">Dias disponíveis:</span> {formattedWeekdays}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="border border-[var(--table-gray)] rounded-md p-4">
                        <h3 className="text-[16px] font-bold text-[var(--color-primary)] mb-2">Estatísticas</h3>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-[var(--gray)]">Posts</p>
                                <p className="text-[20px] font-bold text-[var(--user-gray)]">{user.posts_count}</p>
                            </div>
                            <div>
                                <p className="text-[var(--gray)]">Álbuns</p>
                                <p className="text-[20px] font-bold text-[var(--user-gray)]">{user.albums_count}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-[var(--table-gray)] rounded-md p-4">
                        <h3 className="text-[16px] font-bold text-[var(--color-primary)] mb-2">Ações</h3>
                        <div className="flex gap-4">
                            <Link
                                href="/user"
                                className="px-4 py-2 bg-[var(--intense-light-gray)] text-[var(--user-gray)] rounded-md text-[14px] hover:bg-[var(--medium-gray)] hover:text-white transition-colors"
                            >
                                Voltar à lista
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}