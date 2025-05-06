'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface UserData {
  name: string;
  profileImage?: string;
}

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const mockUserData: UserData = {
        name: "Amanda Santos",
        profileImage: ""
      };
      setUserData(mockUserData);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-x-[10px] w-[190px]"
        onClick={toggleDropdown}
      >
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
          {userData.profileImage ? (
            <Image 
              src={userData.profileImage} 
              alt="Avatar" 
              width={40} 
              height={40} 
            />
          ) : (
            <div className="w-full h-full bg-[var(--color-primary)] flex items-center justify-center text-white text-lg font-bold">
              {getInitials(userData.name)}
            </div>
          )}
        </div>
        <p className="text-[14px]">{userData.name}</p>
      </button>
      
      {isOpen && (
        <div className="absolute top-[50px] right-0 w-[180px] bg-[#222] text-white shadow-lg z-50">
          <ul>
            <li className="py-4 px-6 border-l-4 border-transparent transition-colors hover:border-[var(--color-primary)] hover: cursor-pointer">
              Lista de amigos
            </li>
            <li className="py-4 px-6 border-l-4 border-transparent transition-colors hover:border-[var(--color-primary)] hover: cursor-pointer">
              Artigos salvos
            </li>
            <li className="py-4 px-6 border-l-4 border-transparent transition-colors hover:border-[var(--color-primary)] hover: cursor-pointer">
              Notificações
            </li>
            <li className="py-4 px-6 border-l-4 border-transparent transition-colors hover:border-[var(--color-primary)] hover: cursor-pointer">
              Preferências
            </li>
            <li className="py-4 px-6 border-l-4 border-transparent transition-colors hover:border-[var(--color-primary)] hover: cursor-pointer">
              Fechar Sessão
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}