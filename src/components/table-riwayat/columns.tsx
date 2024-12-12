'use client';

import { ColumnDef } from '@tanstack/react-table';

export type HistoryType = {
  id: string;
  nominal: number;
  tanggal: string;
};

export const Historycolumns: ColumnDef<HistoryType>[] = [
  {
    accessorKey: 'nominal',
    header: 'Nominal',
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal',
  },
];
