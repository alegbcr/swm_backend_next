// app/page.js
// Esto puede seguir siendo un Server Component (predeterminado)
import CustomerForm from "../components/CustomerForm";

export default function Home() {
  return (
    <main>
      <CustomerForm />
    </main>
  );
}
