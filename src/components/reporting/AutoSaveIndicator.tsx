'use client';

interface AutoSaveIndicatorProps {
  lastSaved: Date | null;
  isSaving: boolean;
}

export default function AutoSaveIndicator({ lastSaved, isSaving }: AutoSaveIndicatorProps) {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 120) return '1 minute ago';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 7200) return '1 hour ago';
    return `${Math.floor(seconds / 3600)} hours ago`;
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {isSaving ? (
        <>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-gray-600">Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-gray-600">Saved {getTimeAgo(lastSaved)}</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="text-gray-600">Not saved</span>
        </>
      )}
    </div>
  );
}
