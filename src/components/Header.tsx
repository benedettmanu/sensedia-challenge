'use client'

import Image from 'next/image'
import Logo from '@/assets/header/logo.svg'
import Icon from '@/assets/header/icon.svg'
import Arrow from '@/assets/header/arrow.svg'
import Button1 from '@/assets/header/button_1.svg'
import Button2 from '@/assets/header/button_2.svg'
import Avatar from '@/assets/header/avatar.svg'
import Separator from '@/assets/header/separator.svg'

export function Header() {
  return (
    <header className="w-full">
      <FirstHeader />
      <SecondHeader />
    </header>
  )
}

function FirstHeader() {
  return (
    <div className="bg-[var(--dark-gray)] h-[87px] w-full relative">
      <Image
        src={Logo}
        alt="Logo"
        width={126}
        height={30}
        className="absolute top-[24px] left-[24px]"
      />
      <p
        className="absolute top-[50px] left-[43px] text-[var(--light-gray)] text-[11px]"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        Treinador de futebol
      </p>
    </div>
  )
}

function SecondHeader() {
  return (
    <div className="h-[66px] w-full flex items-center justify-between pl-[24px] pr-[24px]">
      <div className="flex items-center gap-x-[10px]">
        <Image src={Icon} alt="Ícone" width={32} height={32} />
        <p className="text-[var(--color-primary)] text-[14px] font-bold">
          BEM-VINDO
        </p>
        <Image src={Arrow} alt="Seta" width={10} height={6} />
        <p className="text-[16px]">Registro</p>
      </div>

      <div className="flex items-center gap-x-[10px]">
        <div className="flex w-[80px] justify-between items-center">
          <button className="w-[38px] h-[38px]">
            <Image src={Button1} alt="Botão 1" width={38} height={38} />
          </button>
          <button className="w-[38px] h-[38px]">
            <Image src={Button2} alt="Botão 2" width={38} height={38} />
          </button>
        </div>

        <div className="ml-[40px]">
          <Image src={Separator} alt="Separador" width={2} height={38} />
        </div>

        <div className="flex items-center gap-x-[10px] w-[190px] ml-[10px]">
          <button className="w-[40px] h-[40px]">
            <Image src={Avatar} alt="Avatar" width={40} height={40} />
          </button>
          <p className="text-[14px]">Nome de usuário</p>
        </div>
      </div>
    </div>
  );
}