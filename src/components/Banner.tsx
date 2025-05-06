import Image from 'next/image';
import Icon1 from '@/assets/banner/dribbble-square.svg';
import Icon2 from '@/assets/banner/align-left.svg';
import Icon3 from '@/assets/banner/trophy.svg';

export function Banner() {
  return (
    <div className="w-full h-[100px] mt-[153px] bg-[var(--color-primary)] flex items-center text-[var(--white)]">
      <div className="w-[870px] mx-auto flex">
        <div className="flex items-center gap-x-[12px] mr-[120px]">
          <Image src={Icon1} alt="Ícone 1" width={52} height={52} />
          <div className="flex flex-col justify-between h-full">
            <p className="font-bold">Tipo de Quadra</p>
            <p className="font-light">Society</p>
          </div>
        </div>

        <div className="flex items-center gap-x-[12px] mr-[120px]">
          <Image src={Icon2} alt="Ícone 2" width={52} height={52} />
          <div className="flex flex-col justify-between h-full">
            <p className="font-bold">Nível</p>
            <p className="font-light">Semi-Profissional</p>
          </div>
        </div>

        <div className="flex items-center gap-x-[12px]">
          <Image src={Icon3} alt="Ícone 3" width={52} height={52} />
          <div className="flex flex-col justify-between h-full">
            <p className="font-bold">Vitórias</p>
            <p className="font-light">345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
