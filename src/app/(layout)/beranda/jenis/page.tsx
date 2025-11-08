"use client";

import { Jns } from "@/_models/referensi";
import { deleteJns, getJns, saveJns, updateJns } from "@/_service/jenis";
import { useEffect, useState } from "react";

export default function Jenis() {
  const [listJns, setJns] = useState<Jns | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [formkdjns, setFormkdjns] = useState("");
  const [formnmjns, setFormnmjns] = useState("");

  const handleclear = () => {
    setIsEditing(false);
    setIsReadOnly(true);
    setFormkdjns("");
    setFormnmjns("");
  };

  const fetchData = async () => {
    try {
      const res = await getJns();
      if (res.error == true) {
        alert(res.message);
        return;
      } else {
        setJns(res);
      }
    } catch (err) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add data
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formkdjns == "" || undefined) {
      alert("kode tidak boleh kosong");

      document.getElementById("kdjns")!.focus(); // TS error gone, but risky
      return;
    }
    if (formnmjns == "" || undefined) {
      alert("Nama tidak boleh kosong");

      document.getElementById("nmjns")!.focus(); // TS error gone, but risky
      return;
    }

    if (isEditing) {
      try {
        const data = { kdjns: formkdjns, nmjns: formnmjns };
        await updateJns(data);
        fetchData();
        handleclear();
      } catch (error: any) {
        console.log(error);
      } finally {
      }
    } else {
      try {
        const data = { kdjns: formkdjns, nmjns: formnmjns };
        await saveJns(data);
        fetchData();
        handleclear();
      } catch (error: any) {
        console.log(error);
      } finally {
      }
    }
  };
  // delete data

  const handleDelete = async (kdjns: string) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      const data = { kdjns: kdjns };
      await deleteJns(data);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };
  const handleAdd = () => {
    setIsEditing(false);
    setIsReadOnly(false);
    setFormkdjns("");
    setFormnmjns("");
    document.getElementById("kdjns")!.focus(); // TS error gone, but risky
  };
  const handleEdit = (data: any) => {
    setIsEditing(true);
    setIsReadOnly(false);
    setFormnmjns(data.nmjns);
    setFormkdjns(data.kdjns);
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("nmjns")!.focus(); // TS error gone, but risky
  };

  if (loading) return <div>Loading Jns...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listJns) return <p>No data</p>;

  // Safely access the array inside jns.data
  const items = listJns.data; // fallback to empty array
  return (
    <>
      <button onClick={() => handleAdd()}>Add</button>
      <button onClick={() => handleclear()}>Batal</button>
      <br />
      <h4>{isEditing ? "Update Jenis" : "Add Jenis"}</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Kode :
          <input
            type="text"
            readOnly={isReadOnly}
            value={formkdjns}
            name="kdjns"
            id="kdjns"
            disabled={isEditing} // Prevent changing ID during edit
            onChange={(e) => setFormkdjns(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nama:
          <input
            type="text"
            readOnly={isReadOnly}
            name="nmjns"
            value={formnmjns}
            id="nmjns"
            onChange={(e) => setFormnmjns(e.target.value)}
          />
        </label>
        <br />
        {isEditing ? (
          <input type="submit" name="submit" value="Update" />
        ) : (
          <input type="submit" name="submit" value="Create" />
        )}
      </form>

      <ul className="space-y-2">
        {items.map((item: any) => (
          <li
            key={item.kdjns} // ← ALWAYS use unique key (id, kode, etc.)
          >
            <strong>{item.kdjns}</strong> - {item.nmjns}
            <button onClick={() => handleEdit(item)}>U</button>
            <button onClick={() => handleDelete(item.kdjns)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}
