import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";

const ExportScreen = () => {
  const [columns, setColumns] = useState([
    { id: 1, name: "Name", selected: false },
    { id: 2, name: "Email", selected: false },
    { id: 3, name: "Role", selected: false },
  ]);

  const toggleSelectAll = (select) => {
    setColumns(columns.map((col) => ({ ...col, selected: select })));
  };

  const toggleColumn = (id) => {
    setColumns(
      columns.map((col) =>
        col.id === id ? { ...col, selected: !col.selected } : col
      )
    );
  };

  return (
    <MainLayout>
         <div className="bg-white rounded-2xl shadow p-6">
      <div className="p-6">
        <div className="bg-blue-500 text-white text-center py-3 text-xl font-semibold rounded-t-md">
          Export
        </div>

        <div className="bg-white border border-[#417BA0] rounded-b-md px-6 py-4 space-y-4 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <label className="w-40 font-medium">Export to:</label>
              <select className="border shadow px-2 py-1 w-full">
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-40 font-medium">Export all data:</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center">
              <label className="w-40 font-medium">Current page Only:</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center">
              <label className="w-40 font-medium">Number of Records:</label>
              <select className="border shadow px-2 py-1 w-full">
                <option>10</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-40 font-medium">Export Column Header:</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center">
              <label className="w-40 font-medium">Order by:</label>
              <input
                type="text"
                className="border shadow px-2 py-1 w-full"
                placeholder="e.g., Name"
              />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Columns</h2>
            <div className="flex gap-4 mb-2">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => toggleSelectAll(true)}
              >
                Select all
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => toggleSelectAll(false)}
              >
                Deselect all
              </button>
            </div>

            <div className="flex flex-col gap-2 ml-2">
              {columns.map((col) => (
                <label key={col.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={col.selected}
                    onChange={() => toggleColumn(col.id)}
                  />
                  {col.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button className="bg-blue-500 text-white px-6 py-2 rounded">
              Preview
            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded">
              Export
            </button>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default ExportScreen;
