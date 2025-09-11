import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOptions {
  stream: string[];
  status: string[];
  sortBy: string;
}

interface SmartSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  suggestions: string[];
}

const SmartSearchFilter = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  suggestions
}: SmartSearchFilterProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const streamOptions = [
    { value: 'natural', label: 'Natural Science', icon: BookOpen },
    { value: 'social', label: 'Social Science', icon: Users }
  ];

  const statusOptions = [
    { value: 'not-started', label: 'Not Started', icon: Clock },
    { value: 'in-progress', label: 'In Progress', icon: BookOpen },
    { value: 'completed', label: 'Completed', icon: Award }
  ];

  const sortOptions = [
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'weakest', label: 'My Weakest Subject' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Practiced' }
  ];

  const handleFilterChange = (type: keyof FilterOptions, value: string | string[]) => {
    const newFilters = { ...filters, [type]: value };
    onFiltersChange(newFilters);
    
    // Count active filters
    const count = newFilters.stream.length + newFilters.status.length + (newFilters.sortBy !== 'alphabetical' ? 1 : 0);
    setActiveFilters(count);
  };

  const removeFilter = (type: keyof FilterOptions, value: string) => {
    if (type === 'sortBy') {
      handleFilterChange(type, 'alphabetical');
    } else {
      const currentArray = filters[type] as string[];
      handleFilterChange(type, currentArray.filter(item => item !== value));
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      stream: [],
      status: [],
      sortBy: 'alphabetical'
    });
    setActiveFilters(0);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    suggestion.toLowerCase() !== searchQuery.toLowerCase()
  );

  return (
    <div className="space-y-4">
      {/* Search Bar with Suggestions */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input 
          placeholder="Search subjects, topics, or questions..." 
          className="pl-12 pr-4 h-12 text-base"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {/* Search Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
            {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0"
                onClick={() => {
                  onSearchChange(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 justify-center">
        {/* Stream Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Stream
              {filters.stream.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filters.stream.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Study Stream</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {streamOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  const isSelected = filters.stream.includes(option.value);
                  const newStream = isSelected
                    ? filters.stream.filter(s => s !== option.value)
                    : [...filters.stream, option.value];
                  handleFilterChange('stream', newStream);
                }}
                className="gap-2"
              >
                <option.icon className="w-4 h-4" />
                {option.label}
                {filters.stream.includes(option.value) && (
                  <Badge variant="secondary" className="ml-auto">✓</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Status
              {filters.status.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filters.status.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Progress Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  const isSelected = filters.status.includes(option.value);
                  const newStatus = isSelected
                    ? filters.status.filter(s => s !== option.value)
                    : [...filters.status, option.value];
                  handleFilterChange('status', newStatus);
                }}
                className="gap-2"
              >
                <option.icon className="w-4 h-4" />
                {option.label}
                {filters.status.includes(option.value) && (
                  <Badge variant="secondary" className="ml-auto">✓</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Sort by
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('sortBy', option.value)}
                className="gap-2"
              >
                {option.label}
                {filters.sortBy === option.value && (
                  <Badge variant="secondary" className="ml-auto">✓</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear All Filters */}
        {activeFilters > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Clear All ({activeFilters})
          </Button>
        )}
      </div>

      {/* Active Filter Tags */}
      {(filters.stream.length > 0 || filters.status.length > 0 || filters.sortBy !== 'alphabetical') && (
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.stream.map((stream) => (
            <Badge key={stream} variant="secondary" className="gap-1">
              {streamOptions.find(s => s.value === stream)?.label}
              <button
                onClick={() => removeFilter('stream', stream)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.status.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <button
                onClick={() => removeFilter('status', status)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.sortBy !== 'alphabetical' && (
            <Badge variant="secondary" className="gap-1">
              {sortOptions.find(s => s.value === filters.sortBy)?.label}
              <button
                onClick={() => removeFilter('sortBy', filters.sortBy)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearchFilter;