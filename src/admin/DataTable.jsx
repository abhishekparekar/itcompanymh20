import React, { useState } from 'react';

export default function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onBulkDelete, 
  loading 
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(data.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (e, id) => {
    if (e.target.checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      onBulkDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 bg-white rounded-3xl border border-slate-200">
        <div className="w-8 h-8 border-4 border-[#82b443] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-xs text-slate-500 py-10 bg-slate-50 border border-slate-200 rounded-2xl">
        No records found.
      </p>
    );
  }

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="space-y-4">
      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-rose-50 border border-rose-200 p-3 rounded-xl animate-fadeIn">
          <span className="text-xs font-semibold text-rose-700">
            {selectedIds.length} item(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Desktop view (hidden on small screens, shown on md and above) */}
      <div className="hidden md:block overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  checked={allSelected} 
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[#82b443] focus:ring-[#82b443] cursor-pointer"
                />
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  {col.label}
                </th>
              ))}
              <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => handleSelectOne(e, item.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[#82b443] focus:ring-[#82b443] cursor-pointer"
                  />
                </td>
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 text-xs text-slate-700">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-black rounded-lg transition"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                          onDelete(item.id);
                        }
                      }}
                      className="px-3 py-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg transition"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view (shown on mobile, hidden on md and above) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl space-y-4 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) => handleSelectOne(e, item.id)}
                  className="w-4 h-4 rounded border-slate-300 text-[#82b443] focus:ring-[#82b443]"
                />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Select</span>
              </label>
              
              <div className="space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="px-2.5 py-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this item?")) {
                        onDelete(item.id);
                      }
                    }}
                    className="px-2.5 py-1 text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {columns.map((col, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between text-xs gap-1">
                  <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider sm:w-1/3">
                    {col.label}
                  </span>
                  <span className="text-slate-700 sm:w-2/3">
                    {col.render ? col.render(item) : item[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
