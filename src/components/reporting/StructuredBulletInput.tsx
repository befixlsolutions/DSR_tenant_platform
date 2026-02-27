'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface StructuredBulletInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function StructuredBulletInput({ value, onChange, placeholder }: StructuredBulletInputProps) {
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...value, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEditing = (index: number, val: string) => {
    setEditingIndex(index);
    setEditingValue(val);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newValue = [...value];
      if (editingValue.trim()) {
        newValue[editingIndex] = editingValue.trim();
        onChange(newValue);
      } else {
        handleRemove(editingIndex);
      }
      setEditingIndex(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Items */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={index} className="group flex items-start gap-3 p-3 bg-gray-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all">
              <span className="text-primary-500 font-bold mt-0.5">•</span>

              {editingIndex === index ? (
                <input
                  autoFocus
                  className="flex-1 bg-white px-2 py-1 border border-primary-500 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm h-7"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleEditKeyPress}
                />
              ) : (
                <p
                  className="flex-1 text-sm text-gray-700 cursor-pointer"
                  onClick={() => startEditing(index, item)}
                >
                  {item}
                </p>
              )}

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleRemove(index)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Item */}
      <div className="relative">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder || 'Add an item...'}
          className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all"
        />
        <button
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {value.length === 0 && (
        <p className="text-xs text-center text-gray-400 py-2 italic font-light">
          No items yet. Type and press Enter to add.
        </p>
      )}
    </div>
  );
}
