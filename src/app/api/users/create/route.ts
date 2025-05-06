import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

const API_BASE_URL = config.api.baseUrl;

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    if (userData.weekdays && Array.isArray(userData.weekdays)) {
      userData.weekdays = formatWeekdays(userData.weekdays);
    }
    
    const response = await fetch(`${API_BASE_URL}/users/create`, {
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
        errorMessage = errorData.message || `Falha ao criar usuário (${response.status})`;
      } catch (parseError) {
        errorMessage = `Falha ao criar usuário: ${response.status} ${response.statusText}`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const newUser = await response.json();
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao processar a requisição" },
      { status: 500 }
    );
  }
}

function formatWeekdays(selectedDays: boolean[]): string {
  const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const selectedDayNames = selectedDays
    .map((selected, index) => selected ? dayNames[index] : null)
    .filter(Boolean);
  
  if (selectedDayNames.length === 0) return "";
  if (selectedDayNames.length === 7) return "Todos";
  if (selectedDayNames.length === 2 && 
      selectedDayNames.includes('Sábado') && 
      selectedDayNames.includes('Domingo')) {
    return "Fim de semana";
  }
  
  return selectedDayNames.join(', ');
}