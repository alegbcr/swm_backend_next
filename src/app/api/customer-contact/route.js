// app/api/customerContact/route.js

import { NextResponse } from "next/server";
import {
  CustomerContactService,
  NotFoundError,
} from "@/lib/services/customerContact.service";
import { createCustomerContactSchema } from "@/lib/libs/schemas/customerContact.schema";
import { validate, ValidationError } from "@/lib/validation.handler";

const service = new CustomerContactService();

// GET /api/customerContact (Obtener TODOS)
export async function GET() {
  try {
    const infoRegistered = await service.find();
    return NextResponse.json(infoRegistered, { status: 200 });
  } catch (err) {
    console.error("Error handling GET all:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/customerContact (Crear uno nuevo)
export async function POST(request) {
  try {
    const body = await request.json();
    validate(createCustomerContactSchema, body);

    const customer = await service.create(body);
    return NextResponse.json(customer, { status: 201 });
  } catch (err) {
    console.error("Error handling GET by ID:", err.message);

    // --- Manejo de Errores ---
    if (err instanceof NotFoundError) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }

    // 💡 NUEVO: Manejo del error de validación explícito
    if (err instanceof ValidationError) {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: 400 }
      );
    }

    // El resto de los errores (servidor)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
