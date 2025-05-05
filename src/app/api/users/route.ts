import { NextRequest, NextResponse } from "next/server";
import { getPaginatedUsers } from "@/services/userService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    
    const paginatedData = await getPaginatedUsers(page, search);
    
    return NextResponse.json(paginatedData);
  } catch (error) {
    console.error("Error ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Falha ao buscar usuários" },
      { status: 500 }
    );
  }
}