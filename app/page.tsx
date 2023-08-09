import SheetLayout from "@/components/ExpensesSheet/SheetLayout";

export default function Home() {
  return (
    <main>
      <section className="mt-48 w-full flex gap-8">
        <SheetLayout title="Gastos"/>
        <SheetLayout title="Ganhos"/>
      </section>
    </main>
  );
}
