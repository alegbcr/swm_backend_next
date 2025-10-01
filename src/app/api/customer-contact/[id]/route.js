// app/api/customerContact/[id]/route.js

import { NextResponse } from "next/server";
import {
  CustomerContactService,
  NotFoundError,
} from "@/lib/services/customerContact.service";
import {
  updateCustomerContactSchema,
  getCustomerContactSchema,
} from "@/lib/libs/schemas/customerContact.schema";
import { validate, ValidationError } from "@/lib/validation.handler";

const service = new CustomerContactService();

// GET /api/customerContact/:id (Obtener por ID)
// El 'params' contiene { id: 'valor_del_id' }
export async function GET(request, { params }) {
  const { id } = params;

  try {
    validate(getCustomerContactSchema, { id }); // Validar el ID

    const infoRegistered = await service.findOne(id);

    return NextResponse.json(infoRegistered, { status: 200 });
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

// PATCH /api/customerContact/:id (Actualizar por ID)
export async function PATCH(request, { params }) {
  const { id } = params;

  try {
    validate(getCustomerContactSchema, { id }); // Validar el ID

    const body = await request.json();
    validate(updateCustomerContactSchema, body); // Validar el cuerpo

    const customer = await service.update(id, body);

    if (!customer) {
      return NextResponse.json(
        { message: "Contacto no encontrado para actualizar" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer, { status: 200 });
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

// DELETE /api/customerContact/:id (Eliminar por ID)
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    validate(getCustomerContactSchema, { id }); // Validar el ID

    const wasDeleted = await service.delete(id);

    if (!wasDeleted) {
      return NextResponse.json(
        { message: "Contacto no encontrado para eliminar" },
        { status: 404 }
      );
    }

    // Respuesta estándar para DELETE exitoso (204 No Content o 200 OK)
    return NextResponse.json(
      { id, message: "Registro eliminado" },
      { status: 200 }
    );
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
