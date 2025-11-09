"use client";

import { useSalesStore } from "@/app/store/useSalesStore";
import { useState } from "react";

export default function SalesPage() {
  const { sales, addSale, updateSale, deleteSale, clearSales } =
    useSalesStore();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!date || !amount) return;

    if (editId) {
      updateSale(editId, date, Number(amount));
      setEditId(null);
    } else {
      addSale(date, Number(amount));
    }

    setDate("");
    setAmount("");
  };

  const handleEdit = (sale: any) => {
    setDate(sale.dateSale);
    setAmount(sale.sale.toString());
    setEditId(sale.id);
  };

  return (
    <div>
      <h1>Sales CRUD</h1>

      <h2>{editId ? "Edit" : "Add"} Sale</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Sale amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>{editId ? "Update" : "Add"} Sale</button>
      <button
        onClick={() => {
          setDate("");
          setAmount("");
          setEditId(null);
        }}
      >
        Cancel
      </button>

      <h2>Sales List ({sales.length})</h2>
      <button onClick={clearSales}>Clear All</button>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Sale ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan={4}>No sales yet</td>
            </tr>
          ) : (
            sales.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.dateSale}</td>
                <td>{s.sale}</td>
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                  <button onClick={() => deleteSale(s.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <p>
        <strong>Total Sales:</strong> $
        {sales.reduce((sum, s) => sum + s.sale, 0)}
      </p>
      <p>Data persists on refresh!</p>
    </div>
  );
}

// import { useCounterStore } from "@/app/store/useCounterStore";
//
// export default function TesZustand() {
//   const { count, increment, decrement, incrementByAmount, reset } =
//     useCounterStore();
//
//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <p>
//         <button onClick={increment}>Increment</button>
//         <button onClick={decrement}>Decrement</button>
//         <button onClick={() => incrementByAmount(5)}>+5</button>
//         <button onClick={reset}>Reset</button>
//       </p>
//       <p>State persists on refresh! Try it.</p>
//     </div>
//   );
// }
