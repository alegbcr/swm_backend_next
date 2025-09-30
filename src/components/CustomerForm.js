// components/CustomerForm.js
"use client"; // 💡 CLAVE: Indica que este código se ejecuta en el navegador.

import React, { useState } from "react";

// El componente funcional de React.
export default function CustomerForm() {
  // 💡 Paso 1: Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar la recarga

    // Obtener los datos del formulario (más limpio con FormData)
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    // 💡 Paso 2: Ejecutar la lógica de pre-procesamiento de script.js

    // Conversión a null y tipos de datos
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    // Conversiones de tipos
    if (data.birth) data.birth = new Date(data.birth).toISOString();

    // Parsear enteros. Usamos la validación '!= null' para evitar error si es string vacío (ya manejado arriba)
    if (data.income != null) data.income = parseInt(data.income, 10);
    if (data.networth != null) data.networth = parseInt(data.networth, 10);
    if (data.openingAccount != null)
      data.openingAccount = parseInt(data.openingAccount, 10);
    if (data.risk != null) data.risk = parseInt(data.risk, 10);

    if (data.sigdate) data.sigdate = new Date(data.sigdate).toISOString();

    // 💡 Paso 3: Enviar los datos a la API Route
    try {
      const res = await fetch("/api/customerContact", {
        // <--- Asegúrate de usar la ruta correcta (customerContact, no customer-contact)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Customer saved successfully! ID: " + result.id);
        e.target.reset(); // Usar e.target.reset() para resetear el formulario
      } else {
        // Manejo de errores de validación (400) o servidor (500)
        alert("Error: " + (result.error || result.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the network request.");
    }
  };

  // 💡 Paso 4: Devolver el JSX del formulario con el evento onSubmit
  return (
    <>
      <h2>Formulario de Registro</h2>
      <p>
        Para cumplir con las regulaciones internacionales contra el lavado de
        dinero, es necesario completar el siguiente formulario.
      </p>

      <form onSubmit={handleSubmit} id="registrationForm">
        {/* ... (Todo tu JSX del formulario va aquí) ... */}

        {/* Campos requeridos */}
        <label htmlFor="fname">Nombre</label>
        <input type="text" id="fname" name="fname" required />

        <label htmlFor="lname">Apellido</label>
        <input type="text" id="lname" name="lname" required />

        <label htmlFor="phone">Número de Telefono</label>
        <input type="number" id="phone" name="phone" required />

        <label htmlFor="email">Correo Electronico</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="address">Dirección de Residencia</label>
        <input type="text" id="address" name="address" required />

        {/* Optional fields */}
        <label htmlFor="birth">Fecha de Nacimiento</label>
        <input type="date" id="birth" name="birth" />

        <label htmlFor="nationality">Nacionalidad</label>
        <input type="text" id="nationality" name="nationality" />

        <label htmlFor="occupation">Ocupación</label>
        <input type="text" id="occupation" name="occupation" />

        <label htmlFor="advisor">Nombre del Asesor</label>
        <input type="text" id="advisor" name="advisor" />

        <label htmlFor="income">Ingresos Mensuales USD</label>
        <input type="number" id="income" name="income" />

        <label htmlFor="networth">Patrimonio Neto USD</label>
        <input type="number" id="networth" name="networth" />

        <label htmlFor="openingAccount">Monto de Cueta de Apertura USD</label>
        <input type="number" id="openingAccount" name="openingAccount" />

        <label htmlFor="accountType">Tipo de Cuenta</label>
        <select id="accountType" name="accountType">
          <option value="">Seleccionar Valor</option>
          <option value="individual">Individual</option>
          <option value="joint">Joint</option>
          <option value="corporate">Corporativa</option>
        </select>

        <label htmlFor="risk">Capital de riesgo disponible en USD</label>
        <input type="number" id="risk" name="risk" />

        <label htmlFor="experience">Experiencia de Inversión</label>
        <select id="experience" name="experience">
          <option value="">Seleccionar Valor</option>
          <option value="beginner">Iniciante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>

        <label htmlFor="purpose">Proposito de la Cuenta</label>
        <select id="purpose" name="purpose">
          <option value="">Seleccionar Valor</option>
          <option value="speculation">Especulación</option>
          <option value="retirement">Retiro</option>
          <option value="wealth">Crecimiento de Patrimonio</option>
        </select>

        <label htmlFor="accountBefore">
          Actualmente tiene o tuvo una cuenta con nosotros antes?
        </label>
        <select id="accountBefore" name="accountBefore">
          <option value="">Seleccionar Valor</option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="beneficiary">
          ¿Quieres designar a un beneficiario?
        </label>
        <select id="beneficiary" name="beneficiary">
          <option value="">Seleccionar Valor</option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="bank">
          Nombre del banco desde donde está depositando
        </label>
        <input type="text" id="bank" name="bank" />

        <label htmlFor="signature">Firma</label>
        <textarea id="signature" name="signature"></textarea>

        <label htmlFor="sigdate">Firma Fecha</label>
        <input type="date" id="sigdate" name="sigdate" />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
