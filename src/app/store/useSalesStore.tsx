// store/useSalesStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Sale {
  id: string;
  dateSale: string; // YYYY-MM-DD
  sale: number;
}

interface SalesState {
  sales: Sale[];
  // CREATE
  addSale: (dateSale: string, sale: number) => void;
  // READ
  getSales: () => Sale[];
  getSaleById: (id: string) => Sale | undefined;
  // UPDATE
  updateSale: (id: string, dateSale: string, sale: number) => void;
  // DELETE
  deleteSale: (id: string) => void;
  // CLEAR ALL
  clearSales: () => void;
}

export const useSalesStore = create<SalesState>()(
  devtools(
    // ← This enables Redux DevTools!
    persist(
      (set, get) => ({
        sales: [],

        addSale: (dateSale, sale) =>
          set(
            (state) => ({
              sales: [
                ...state.sales,
                {
                  id: Date.now().toString(), // simple unique ID
                  dateSale,
                  sale,
                },
              ],
            }),
            false,
            "addSale", // ← THIS IS THE MAGIC
          ),

        getSales: () => get().sales,

        getSaleById: (id) => get().sales.find((s) => s.id === id),

        updateSale: (id, dateSale, sale) =>
          set(
            (state) => ({
              sales: state.sales.map((s) =>
                s.id === id ? { ...s, dateSale, sale } : s,
              ),
            }),
            false,
            "updateSale", // ← THIS IS THE MAGIC
          ),

        deleteSale: (id) =>
          set(
            (state) => ({
              sales: state.sales.filter((s) => s.id !== id),
            }),
            false,
            "deleteSale", // ← THIS IS THE MAGIC
          ),

        clearSales: () => set({ sales: [] }),
      }),
      {
        name: "sales-storage", // saved in localStorage
      },
    ),
  ),
);
