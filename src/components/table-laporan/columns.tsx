'use client';

import { ColumnDef } from '@tanstack/react-table';
import { badgeVariants } from '@/components/ui/badge';
import Link from 'next/link';
import { File } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
  id: string;
  file: {
    nama: string;
    url: string;
  };
  tanggal: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'file',
    header: 'File',
    cell: ({ row }) => {
      const file = row.original.file;
      return (
        <Link href={file.url} className={badgeVariants({ variant: 'outline' })}>
          <div className='flex items-center gap-2 p-2'>
            <File size={16} />
            <p className='font-poppins font-thin'>{file.nama}</p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal',
  },
];
