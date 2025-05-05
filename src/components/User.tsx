'use client'

import Image from 'next/image'
import SearchIcon from '@/assets/user/search.svg'

const users = Array(5).fill({
    user: 'Sonya64',
    nome: 'Mildred Turner',
    email: 'Loraine25@hotmail.com',
    cidade: 'Abraham ',
    dias: 'Todos',
    posts: 3,
    albuns: 2,
})

export function User() {
    return (
        <div className="w-full h-[631px] mt-[20px]">
            <div
                className="w-[870px] mx-auto text-[16px] text-black font-normal"
                style={{ fontFamily: 'var(--font-montserrat)' }}
            >
                <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">Usuários</h1>

                <div className="relative mb-[40px]">
                    <input
                        type="text"
                        placeholder="Procurar"
                        className="w-[870px] h-[38px] bg-[var(--intense-light-gray)] border-b border-gray-400 rounded-t-[8px] pl-[12px] pr-[40px] outline-none placeholder: text-[var(--dark-gray)]"
                    />
                    <Image
                        src={SearchIcon}
                        alt="Procurar"
                        width={24}
                        height={24}
                        className="absolute right-[12px] top-[7px]"
                    />
                </div>

                <div className="w-[870px] h-[411px] mb-[30px]">
                    <table className="w-full text-left border-t border-[var(--table-gray)] border-separate border-spacing-y-[4px]">
                        <thead>
                            <tr className="text-[12px] uppercase text-[var(--intense-gray)]">
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">User</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">Nome</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">E-mail</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">Cidade</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">Dias da semana</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">Posts</th>
                                <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">Álbuns</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i} className="h-[71px]">
                                    <td className="font-bold text-[var(--user-gray)] border-b border-[var(--table-gray)]">{user.user}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.nome}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.email}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.cidade}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.dias}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.posts}</td>
                                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">{user.albuns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between w-full text-[var(--gray)]">
                    <div className="w-[64px] text-[12px] font-medium">TOTAL 100</div>

                    <div className="w-[411px] flex items-center justify-between flex-wrap text-[12px]">
                        <button className="h-[36px] w-[80px] border border-[var(--medium-gray)] rounded-[18px]">ANTERIOR</button>

                        <button className="h-[36px] w-[36px] border border-[var(--medium-gray)] rounded-[18px]">1</button>

                        <span className="px-1">...</span>

                        <div className="flex h-[36px] w-[108px]">
                            <button className="w-[36px] border border-[var(--medium-gray)] border-r-0 rounded-l-[18px]">3</button>
                            <button className="w-[36px] border border-[var(--medium-gray)] font-bold bg-[var(--medium-gray)] text-[var(--white)]">4</button>
                            <button className="w-[36px] border border-[var(--medium-gray)] border-l-0 rounded-r-[18px]">5</button>
                        </div>

                        <span className="px-1">...</span>

                        <button className="h-[36px] w-[36px] border border-[var(--medium-gray)] rounded-[18px]">8</button>

                        <button className="h-[36px] w-[80px] border border-[var(--medium-gray)] rounded-[18px]">PRÓXIMO</button>
                    </div>

                    <div className="w-[130px] flex items-center gap-2 text-[12px] relative uppercase">
                        <span>Ir para a página</span>
                        <select className="w-[60px] h-[30px] border-0 border-b border-[var(--medium-gray)] pl-2 pr-6 bg-transparent text-center outline-none">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                                <option key={page} value={page}>
                                    {page}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}