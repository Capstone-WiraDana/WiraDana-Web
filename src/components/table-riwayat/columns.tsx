'use client';

import { ColumnDef } from '@tanstack/react-table';

export type HistoryType = {
  id: string;
  amount: string;
  createdAt: Date;
};

export const Historycolumns: ColumnDef<HistoryType>[] = [
  {
    accessorKey: 'nominal',
    header: 'Nominal',
    cell: ({ row }) => {
      const nominal = row.original.amount;
      return <p>Rp {nominal.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>;
    },
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <p>{new Date(date).toLocaleDateString('id-ID')}</p>;
    },
  },
];
