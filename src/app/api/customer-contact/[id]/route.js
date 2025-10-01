// app/api/customerContact/[id]/route.js

import { NextResponse } from "next/server";
import {
  CustomerContactService,
  NotFoundError,
} from "@/lib/services/customerContact.service";
import {
  updateCustomerContactSchema,
  getCustomerContactSchema,
} from "@/lib/schemas/customerContact.schema";

const service = new CustomerContactService();
const validate = (schema, data) => {
  /* ... (Tu lógica de validación) ... */
};

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

    // 💡 Aquí manejamos el error específico
    if (err instanceof NotFoundError) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }

    // El resto de los errores (validación o servidor)
    const status =
      err.message && err.message.includes("validation") ? 400 : 500;
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status }
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
    console.error("Error handling PATCH:", err.message);
    const status =
      err.message && err.message.includes("validation") ? 400 : 500;
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status }
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
    console.error("Error handling DELETE:", err.message);
    const status =
      err.message && err.message.includes("validation") ? 400 : 500;
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status }
    );
  }
}
