import React from 'react';
import { Inbox } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-hover border-b border-border sticky top-0 z-10">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-surface-hover transition-colors duration-150"
              >
                {columns.map((col) => {
                  if (col.render) {
                    return (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render(row)}
                      </td>
                    );
                  }

                  const val = row[col.key];
                  
                  // Special rendering for 'Estado' if it exists to make it look like a badge
                  if (col.key.toLowerCase() === 'estado' || col.key.toLowerCase() === 'status') {
                    return (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                          val === 'Completado' || val === 'Activo' || val === 'Acreditado' ? 'bg-success/15 text-success' : 
                          val === 'Pendiente' ? 'bg-warning/15 text-warning' :
                          val === 'Observado' ? 'bg-destructive/15 text-destructive' :
                          'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {val}
                        </span>
                      </td>
                    );
                  }

                  return (
                    <td 
                      key={col.key} 
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground"
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-foreground-muted">
                    <Inbox className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-sm font-medium">No hay registros disponibles</p>
                    <p className="text-xs opacity-70 mt-1">Intente cambiar los filtros o crear un nuevo registro.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
