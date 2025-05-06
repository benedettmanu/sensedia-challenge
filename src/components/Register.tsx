'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HelpIcon1 from '@/assets/register/life-ring.svg';
import HelpIcon2 from '@/assets/register/heartbeat.svg';
import HelpIcon3 from '@/assets/register/grin-alt.svg';

interface RegisterFormData {
  username: string;
  fullName: string;
  email: string;
  city: string;
  password: string;
}

interface RegisterProps {
  redirectPath?: string;
}

const Register = ({ redirectPath }: RegisterProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    fullName: '',
    email: '',
    city: '',
    password: '',
  });

  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    new Array(7).fill(false)
  );
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        username: formData.username,
        weekdays: selectedDays
          .map((selected, index) => (selected ? index : -1))
          .filter((day) => day !== -1)
          .join(','),
      };

      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error || `Falha ao criar usuário (${response.status})`;
        } catch (parseError) {
          errorMessage = `Falha ao criar usuário: ${response.status} ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      setFormData({
        username: '',
        fullName: '',
        email: '',
        city: '',
        password: '',
      });
      setSelectedDays(new Array(7).fill(false));

      if (redirectPath) {
        router.push(
          `${redirectPath}?notification=Usuário criado com sucesso!&type=success`
        );
      } else {
        setNotification({
          show: true,
          message: 'Usuário criado com sucesso!',
          type: 'success',
        });
        setTimeout(
          () => setNotification({ show: false, message: '', type: '' }),
          3000
        );
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar usuário';
      setSubmitError(errorMessage);

      setNotification({ show: true, message: errorMessage, type: 'error' });
      setTimeout(
        () => setNotification({ show: false, message: '', type: '' }),
        3000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (redirectPath) {
      router.push(redirectPath);
    } else {
      setFormData({
        username: '',
        fullName: '',
        email: '',
        city: '',
        password: '',
      });
      setSelectedDays(new Array(7).fill(false));
      setErrors({});
      setSubmitError('');
    }
  };

  const helpItems = [
    {
      title: 'Precisa de ajuda?',
      src: HelpIcon1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Por que se registrar?',
      src: HelpIcon2,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'O que está acontecendo?...',
      src: HelpIcon3,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  return (
    <div className="w-[875px] h-auto mx-auto mb-[20px]">
      {!redirectPath && (
        <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">
          Registro
        </h1>
      )}

      <div className="w-[875px] h-[132px] flex justify-between mb-[60px]">
        {helpItems.map((item, index) => (
          <div key={index} className="w-[272px] h-[132px]">
            <h3 className="text-[16px] text-[var(--color-primary)] font-bold">
              {item.title}
            </h3>
            <div className="flex justify-between mt-[20px]">
              <Image src={item.src} alt="Help Icon" width={45} height={45} />
              <div className="w-[213px] h-[95px]">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[870px] h-auto border border-[var(--table-gray)] pt-[36px] px-[20px] rounded-[10px]"
      >
        <h2 className="text-[14px] uppercase text-[var(--intense-gray)] font-bold mb-[20px]">
          Registro
        </h2>

        {submitError && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)] ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Nome de usuário *"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)] ${errors.city ? 'border-red-500' : ''}`}
              placeholder="Cidade *"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <div className="mb-[20px]">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)] ${errors.fullName ? 'border-red-500' : ''}`}
                placeholder="Nome completo *"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-[20px]">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)] ${errors.email ? 'border-red-500' : ''}`}
                placeholder="E-mail *"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-[20px]">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-[403px] h-[38px] border-b rounded-t-[4px] bg-[var(--intense-light-gray)] px-[8px] mt-[8px] placeholder:text-[14px] placeholder:text-[var(--gray)] ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Senha *"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mb-[20px]">
            <label className="block text-[14px] uppercase text-[var(--intense-gray)] font-bold mb-[10px]">
              Dias da semana
            </label>
            <div className="grid grid-cols-4 gap-[10px]">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(
                (day, index) => (
                  <div key={index} className="flex items-center w-[82px]">
                    <input
                      type="checkbox"
                      checked={selectedDays[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-[20px] h-[20px] mr-[10px] border rounded-[4px]"
                      style={{ accentColor: 'var(--light-purple)' }}
                    />
                    <label className="text-[14px] text-[var(--dark-gray)]">
                      {day}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-[10px] mt-[60px] mb-[20px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[116px] h-[42px] bg-[var(--light-purple)] text-[var(--white)] text-[14px] uppercase rounded-[21px] font-bold flex items-center justify-center"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Registrar'
            )}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-[116px] h-[42px] bg-[var(--white)] text-[var(--light-purple)] text-[14px] uppercase rounded-[21px] font-bold"
          >
            Cancelar
          </button>
        </div>
      </form>

      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white z-50`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Register;
