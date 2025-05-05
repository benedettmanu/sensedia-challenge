'use client'

import { useState } from 'react';
import Image from 'next/image';
import HelpIcon1 from '@/assets/register/life-ring.svg';
import HelpIcon2 from '@/assets/register/heartbeat.svg';
import HelpIcon3 from '@/assets/register/grin-alt.svg';

const Register = () => {
    const [selectedDays, setSelectedDays] = useState<boolean[]>(new Array(7).fill(false));

    const handleCheckboxChange = (index: number) => {
        const updatedDays = [...selectedDays];
        updatedDays[index] = !updatedDays[index];
        setSelectedDays(updatedDays);
    };

    const helpItems = [
        {
            title: 'Precisa de ajuda?',
            src: HelpIcon1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            title: 'Por que se registrar?',
            src: HelpIcon2,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            title: 'O que está acontecendo?...',
            src: HelpIcon3,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];

    return (
        <div className="w-[875px] h-[680px] mx-auto mt-[20px] mb-[20px]">
            <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">Registro</h1>

            <div className="w-[875px] h-[132px] flex justify-between mb-[60px]">
                {helpItems.map((item, index) => (
                    <div key={index} className="w-[272px] h-[132px]">
                        <h3 className="text-[16px] text-[var(--color-primary)] font-bold">{item.title}</h3>
                        <div className="flex justify-between mt-[20px]">
                            <Image src={item.src} alt="Help Icon" width={45} height={45} />
                            <div className="w-[213px] h-[95px]">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-[870px] h-[402px] border border-[var(--table-gray)] pt-[36px] px-[20px] rounded-[10px]">
                <h2 className="text-[14px] uppercase text-[var(--intense-gray)] font-bold mb-[20px]">Registro</h2>

                <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                    <div>
                        <input
                            type="text"
                            className="w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)]"
                            placeholder="Nome de usuário *"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            className="w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)]"
                            placeholder="Cidade *"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                    <div>
                        <div className="mb-[20px]">
                            <input
                                type="text"
                                className="w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)]"
                                placeholder="Nome completo *"
                            />
                        </div>

                        <div className="mb-[20px]">
                            <input
                                type="text"
                                className="w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)]"
                                placeholder="E-mail *"
                            />
                        </div>
                    </div>

                    <div className="mb-[20px]">
                        <label className="block text-[14px] uppercase text-[var(--intense-gray)] font-bold mb-[10px]">Dias da semana</label>
                        <div className="grid grid-cols-4 gap-[10px]">
                            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day, index) => (
                                <div key={index} className="flex items-center w-[82px]">
                                    <input
                                        type="checkbox"
                                        checked={selectedDays[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                        className="w-[20px] h-[20px] mr-[10px] border rounded-[4px]"
                                        style={{ accentColor: 'var(--light-purple)' }}
                                    />
                                    <label className="text-[14px] text-[var(--dark-gray)]">{day}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-[10px] mt-[60px]">
                    <button className="w-[116px] h-[42px] bg-[var(--light-purple)] text-[var(--white)] text-[14px] uppercase rounded-[21px] font-bold">
                        Registrar
                    </button>
                    <button className="w-[116px] h-[42px] bg-[var(--white)] text-[var(--light-purple)] text-[14px] uppercase rounded-[21px] font-bold">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;