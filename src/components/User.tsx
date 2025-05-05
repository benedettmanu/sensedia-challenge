"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/user/search.svg";
import TrashIcon from "@/assets/user/trash-icon.svg";
import { PaginatedUsers, User as UserType } from "@/models/User";
import { useDebounce } from "@/hook/useDebounce";

interface DeleteModalProps {
  isOpen: boolean;
  user: UserType | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

function DeleteModal({
  isOpen,
  user,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[var(--user-gray)]">
          Confirmar exclusão
        </h2>
        <p className="mb-6 text-[var(--gray)]">
          Tem certeza que deseja excluir o usuário{" "}
          <span className="font-bold">{user.name}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 border border-[var(--medium-gray)] rounded-[4px] text-[var(--gray)] hover:bg-[var(--intense-light-gray)] transition-colors"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 ${
              isDeleting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            } text-white rounded-[4px] transition-colors flex items-center justify-center min-w-[80px]`}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Excluindo...
              </>
            ) : (
              "Excluir"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function User() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<PaginatedUsers>({
    users: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [deletingUser, setDeletingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          search: debouncedSearchTerm,
        }).toString();

        const response = await fetch(`/api/users?${queryParams}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }

        const data: PaginatedUsers = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleDeleteClick = (user: UserType) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setDeletingUser(true);
    try {
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Erro ao excluir usuário: ${response.statusText}`
        );
      }

      const result = await response.json();

      setUserData((prev) => {
        if (prev.users.length === 1 && prev.currentPage > 1) {
          setTimeout(() => setCurrentPage(prev.currentPage - 1), 0);
        }

        return {
          ...prev,
          users: prev.users.filter((user) => user.id !== userToDelete.id),
          totalCount: prev.totalCount - 1,
          totalPages: Math.ceil((prev.totalCount - 1) / 5),
        };
      });

      alert(`Usuário ${userToDelete.name} excluído com sucesso.`);

      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert(
        `Erro ao excluir usuário: ${
          error instanceof Error
            ? error.message
            : "Ocorreu um erro desconhecido."
        }`
      );
    } finally {
      setDeletingUser(false);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const renderPaginationButtons = () => {
    if (userData.totalPages <= 1) return null;

    const pageOptions = Array.from(
      { length: userData.totalPages },
      (_, i) => i + 1
    );

    let middleButtons = [];

    if (userData.totalPages <= 5) {
      middleButtons = Array.from(
        { length: userData.totalPages - 2 },
        (_, i) => i + 2
      );
    } else {
      let centerButton = currentPage;

      if (currentPage <= 2) {
        centerButton = 3;
      } else if (currentPage >= userData.totalPages - 1) {
        centerButton = userData.totalPages - 2;
      }

      middleButtons = [centerButton - 1, centerButton, centerButton + 1];
    }

    const showStartEllipsis = userData.totalPages > 5 && middleButtons[0] > 2;
    const showEndEllipsis =
      userData.totalPages > 5 && middleButtons[2] < userData.totalPages - 1;

    return (
      <div className="flex items-center justify-between w-full text-[var(--gray)]">
        <div className="w-[64px] text-[12px] font-medium">
          TOTAL {userData.totalCount}
        </div>

        <div className="w-[411px] flex items-center justify-between flex-wrap text-[12px]">
          <button
            className="h-[36px] w-[80px] border border-[var(--medium-gray)] rounded-[18px] transition-colors hover:bg-[var(--intense-light-gray)]"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ANTERIOR
          </button>

          <button
            className={`h-[36px] w-[36px] border border-[var(--medium-gray)] rounded-[18px] transition-colors hover:bg-[var(--intense-light-gray)] ${
              currentPage === 1
                ? "font-bold bg-[var(--medium-gray)] text-[var(--white)] hover:bg-[var(--medium-gray)]"
                : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>

          {showStartEllipsis && <span className="px-1">...</span>}

          <div className="flex h-[36px] w-[108px]">
            <button
              className={`w-[36px] border border-[var(--medium-gray)] border-r-0 rounded-l-[18px] transition-colors hover:bg-[var(--intense-light-gray)] ${
                currentPage === middleButtons[0]
                  ? "font-bold bg-[var(--medium-gray)] text-[var(--white)] hover:bg-[var(--medium-gray)]"
                  : ""
              }`}
              onClick={() => handlePageChange(middleButtons[0])}
            >
              {middleButtons[0]}
            </button>
            <button
              className={`w-[36px] border border-[var(--medium-gray)] transition-colors ${
                currentPage === middleButtons[1]
                  ? "font-bold bg-[var(--medium-gray)] text-[var(--white)] hover:bg-[var(--medium-gray)]"
                  : "hover:bg-[var(--intense-light-gray)]"
              }`}
              onClick={() => handlePageChange(middleButtons[1])}
            >
              {middleButtons[1]}
            </button>
            <button
              className={`w-[36px] border border-[var(--medium-gray)] border-l-0 rounded-r-[18px] transition-colors hover:bg-[var(--intense-light-gray)] ${
                currentPage === middleButtons[2]
                  ? "font-bold bg-[var(--medium-gray)] text-[var(--white)] hover:bg-[var(--medium-gray)]"
                  : ""
              }`}
              onClick={() => handlePageChange(middleButtons[2])}
            >
              {middleButtons[2]}
            </button>
          </div>

          {showEndEllipsis && <span className="px-1">...</span>}

          {userData.totalPages > 1 && (
            <button
              className={`h-[36px] w-[36px] border border-[var(--medium-gray)] rounded-[18px] transition-colors hover:bg-[var(--intense-light-gray)] ${
                currentPage === userData.totalPages
                  ? "font-bold bg-[var(--medium-gray)] text-[var(--white)] hover:bg-[var(--medium-gray)]"
                  : ""
              }`}
              onClick={() => handlePageChange(userData.totalPages)}
            >
              {userData.totalPages}
            </button>
          )}

          <button
            className="h-[36px] w-[80px] border border-[var(--medium-gray)] rounded-[18px] transition-colors hover:bg-[var(--intense-light-gray)]"
            onClick={() =>
              handlePageChange(Math.min(userData.totalPages, currentPage + 1))
            }
            disabled={currentPage === userData.totalPages}
          >
            PRÓXIMO
          </button>
        </div>

        <div className="w-[140px] flex items-center gap-2 text-[12px] relative uppercase">
          <span>Ir para a página</span>
          <select
            className="w-[70px] h-[30px] border-0 border-b border-[var(--medium-gray)] pl-2 pr-6 bg-transparent text-center outline-none cursor-pointer hover:border-[var(--user-gray)]"
            value={currentPage}
            onChange={handlePageSelectChange}
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[651px] mt-[20px]">
      <div className="w-[870px] mx-auto text-[16px] text-black font-normal">
        <h1 className="text-[24px] text-[var(--user-gray)] font-bold mb-[25px]">
          Usuários
        </h1>

        <div className="relative mb-[40px]">
          <input
            type="text"
            placeholder="Procurar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[870px] h-[38px] bg-[var(--intense-light-gray)] border-b border-gray-400 rounded-t-[8px] pl-[12px] pr-[40px] outline-none focus:border-[var(--user-gray)] transition-colors"
          />
          <Image
            src={SearchIcon}
            alt="Procurar"
            width={24}
            height={24}
            className="absolute right-[12px] top-[7px] cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>

        <div className="w-[870px] h-[460px] mb-[10px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-[300px] text-[var(--gray)]">
              <p>Carregando usuários...</p>
            </div>
          ) : userData.users.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-[var(--gray)]">
              <p>Nenhum usuário encontrado.</p>
            </div>
          ) : (
            <table className="w-full text-left border-t border-[var(--table-gray)] border-separate border-spacing-y-[4px]">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-[12px] uppercase text-[var(--intense-gray)]">
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)] min-w-[40px]">
                    User
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">
                    Nome
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">
                    E-mail
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">
                    Cidade
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)]">
                    Dias da semana
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)] min-w-[60px]">
                    Posts
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)] min-w-[60px]">
                    Álbuns
                  </th>
                  <th className="pb-[10px] pt-[10px] border-b border-[var(--table-gray)] min-w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {userData.users.map((user) => (
                  <tr
                    key={user.id}
                    className="h-[71px] hover:bg-[var(--intense-light-gray)] transition-colors group"
                  >
                    <td className="font-bold text-[var(--user-gray)] border-b border-[var(--table-gray)] min-w-[40px]">
                      {user.id}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">
                      {user.name}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">
                      {user.email}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">
                      {user.city}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)]">
                      {user.weekdays}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)] min-w-[60px]">
                      {user.posts_count}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)] min-w-[60px]">
                      {user.albums_count}
                    </td>
                    <td className="text-[var(--gray)] border-b border-[var(--table-gray)] min-w-[50px] text-center">
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <Image
                          src={TrashIcon}
                          alt="Excluir"
                          width={20}
                          height={20}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {renderPaginationButtons()}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        user={userToDelete}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
        isDeleting={deletingUser}
      />
    </div>
  );
}
