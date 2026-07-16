import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Input } from "./Input";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function DataTable({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filter
  const filteredData = React.useMemo(() => {
    if (!searchKey || !searchTerm) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchKey, searchTerm]);

  // Sort
  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-card border border-border rounded-[24px] overflow-hidden flex flex-col shadow-sm">
      {/* Toolbar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/10">
        {searchKey ? (
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 bg-background w-full h-10"
            />
          </div>
        ) : (
          <div />
        )}
        <Button
          variant="outline"
          className="w-full sm:w-auto h-10 bg-background"
        >
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto w-full">
        <Table className="w-full border-0 rounded-none">
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    col.sortable
                      ? "cursor-pointer hover:bg-muted/50 select-none"
                      : "",
                  )}
                  onClick={() =>
                    col.sortable &&
                    col.accessorKey &&
                    handleSort(col.accessorKey)
                  }
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable &&
                      sortConfig?.key === col.accessorKey &&
                      (sortConfig?.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col, j) => (
                    <TableCell key={j}>
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                          ? String(row[col.accessorKey])
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-text-secondary"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between text-sm text-text-secondary">
        <div>
          Showing{" "}
          {sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}{" "}
          to {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-foreground px-2">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
