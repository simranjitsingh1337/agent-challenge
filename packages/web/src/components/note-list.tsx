"use client";

type NoteListProps = {
  notes: string[];
  selectedNote: string | null;
  onSelectNote: (note: string) => void;
  onRefresh: () => void;
};

export function NoteList({ notes, selectedNote, onSelectNote, onRefresh }: NoteListProps) {
  return (
    <div className="w-1/4 border-r border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search notes"
          className="w-full mr-2 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button onClick={onRefresh} className="px-3 py-2 border rounded-md" title="Refresh notes">🔄</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note}
            className={`p-2 rounded-md cursor-pointer ${selectedNote === note ? "bg-gray-100" : ""}`}
            onClick={() => onSelectNote(note)}
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
} 