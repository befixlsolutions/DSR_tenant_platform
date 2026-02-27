'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface EvidenceLinkInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function EvidenceLinkInput({ value, onChange }: EvidenceLinkInputProps) {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    if (!newLink.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(newLink.trim())) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onChange([...value, newLink.trim()]);
    setNewLink('');
    setError('');
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      {/* Existing Links */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((link, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-blue-600 hover:text-blue-700 truncate"
              >
                {link}
              </a>
              <button
                onClick={() => handleRemove(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link */}
      <div>
        <div className="flex gap-2">
          <input
            type="url"
            value={newLink}
            onChange={(e) => {
              setNewLink(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="https://github.com/company/repo/pull/123"
            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <Button onClick={handleAdd} disabled={!newLink.trim()}>
            Add Link
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>

      {value.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="text-sm">No evidence links added</p>
          <p className="text-xs mt-1">Add links to PRs, tickets, or documentation</p>
        </div>
      )}
    </div>
  );
}
