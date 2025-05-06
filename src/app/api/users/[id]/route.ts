import { NextRequest, NextResponse } from "next/server";
import { deleteUserById, getUserById } from "@/services/userService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(`Erro ao buscar usuário ${params.id}:`, error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = (await params).id;

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const deleted = await deleteUserById(userId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Falha ao excluir usuário" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Usuário ${userId} excluído com sucesso`,
    });
  } catch (error) {
    console.error(`Erro ao excluir usuário ${params.id}:`, error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
