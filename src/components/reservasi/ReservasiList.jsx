import Icon from '@/components/ui/Icon';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '@/components/ui/CustomAlert';
import useReservasiMutations from '@/hooks/website/reservasi/useReservasiMutations';

const ReservasiList = ({ data, pagination, setPagination, searchQuery, setSearchQuery }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { remove } = useReservasiMutations();

  // Definisikan kolom untuk react-table
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'appointmentDate',
      header: 'tanggal',
      cell: ({ row }) => new Date(row.original.appointmentDate).toLocaleDateString(),
    },
    {
      accessorKey: 'appointmentTime',
      header: 'waktu',
    },
    {
      accessorKey: 'nama',
      header: 'pasien',
    },
    {
      accessorKey: 'no_hp',
      header: 'nomor telepon',
    },
    {
      accessorKey: 'status',
      header: 'status',
    },
    {
      accessorKey: 'aksi',
      header: 'aksi',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleDeleteClick(row.original.id)}
            className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-lg"
          >
            <Icon name="trash" />
          </button>
          <Link
            to={`/admin/reservasi/edit/${row.original.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary"
          >
            <Icon name="pencil" />
          </Link>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: data?.data || [],
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearchQuery,
    manualPagination: true,
    pageCount: data?.totalPages || 1,
    state: {
      pagination,
    },
  });

  // Fungsi untuk handle klik tombol hapus
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteAlert(true);
  };

  return (
    <>
      {/* Kontrol pagination dan pencarian */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 py-2">
          <p className="font-medium">Show</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p className="font-medium">entries</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      {/* Tabel data */}
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100 h-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border border-gray-300 px-3"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="h-10 border-b border-gray-300">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination info dan tombol navigasi */}
      <div className="flex items-center justify-between mt-4">
        <p>
          Showing{' '}
          {table.getRowModel().rows.length === 0
            ? 0
            : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}{' '}
          to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getPrePaginationRowModel().rows.length
          )}{' '}
          of {table.getPrePaginationRowModel().rows.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 disabled:opacity-50"
          >
            <Icon name="double-arrow-left" />
          </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => table.setPageIndex(i)}
              className={`px-2 py-1 rounded-lg ${
                table.getState().pagination.pageIndex === i
                  ? 'bg-primary text-white'
                  : 'border border-black'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 disabled:opacity-50"
          >
            <Icon name="double-arrow-right" />
          </button>
        </div>
      </div>

      {/* Konfirmasi hapus data */}
      {showDeleteAlert && (
        <CustomAlert
          title="Hapus Data?"
          message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={() => {
            remove.mutate(deleteId, {
              onSuccess: () => setShowDeleteAlert(false),
            });
          }}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default ReservasiList;
