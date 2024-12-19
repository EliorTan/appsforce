import { useState } from "react";

interface SearchFilterProps {
  onSearch: (searchTerm: string, filterType: string) => void;
}

export const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, filterType);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterType(value);
    onSearch(searchTerm, value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        className="flex-1 px-4 py-2 rounded-md bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="w-full sm:w-32 px-4 py-2 rounded-md bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="id">ID</option>
        <option value="location">Location</option>
      </select>
    </div>
  );
};
