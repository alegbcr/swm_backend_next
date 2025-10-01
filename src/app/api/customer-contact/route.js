// app/api/customerContact/route.js

import { NextResponse } from "next/server";
import {
  CustomerContactService,
  NotFoundError,
} from "../../../lib/services/customerContact.service";
import { createCustomerContactSchema } from "../../../lib/libs/schemas/customerContact.schema";

const service = new CustomerContactService();
const validate = (schema, data) => {
  /* ... (Tu lógica de validación) ... */
};

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
    console.error("Error handling POST:", err.message);
    // Manejo de errores de validación y servidor
    const status =
      err.message && err.message.includes("validation") ? 400 : 500;
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status }
    );
  }
}
