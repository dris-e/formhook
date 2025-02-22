import DefaultDropdown, { DefaultDropdownProps } from "@/components/default-dropdown";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DropdownProps extends DefaultDropdownProps {
  title: string;
}

export function Dropdown({ title, items, muted }: DropdownProps) {
  return (
    <DefaultDropdown items={items} muted={muted}>
      <Button variant="outline" className="w-full max-w-64 justify-between">
        <span className="text-xs">{title}</span>
        <ChevronDownIcon />
      </Button>
    </DefaultDropdown>
  );
}

const columnLabels: Record<string, string> = {
  updatedAt: "Last updated",
};

const hiddenColumns = ["actions", "select"];

export function DropdownSelect<T>({ table }: { table: Table<T> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full max-w-64 justify-between">
          <span className="text-xs">Filter</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table
          .getAllColumns()
          .filter((column) => !hiddenColumns.includes(column.id))
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="cursor-pointer"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              <span className="text-xs">
                {columnLabels[column.id] ||
                  column.id
                    .replace(/^data./, "")
                    .substring(0, 1)
                    .toUpperCase() + column.id.replace(/^data./, "").substring(1)}
              </span>
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
