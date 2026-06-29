interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onSearch, placeholder = 'Search for character...' }: SearchBarProps) => {
  return (
    <div className="relative group">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 size-3 sm:size-4 text-neutral-400 pointer-events-none transition-colors group-focus-within:text-otz"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        name="searchbar"
        id="searchbar"
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="text-sm sm:text-base pl-9 pr-8 py-2 w-full rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-otz focus:ring-1 focus:ring-otz transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => onSearch('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-600 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

  );
};
