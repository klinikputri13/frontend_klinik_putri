import CustomAlert from '@/components/ui/CustomAlert';
import useRiwayatMutations from '@/hooks/website/riwayat/useRiwayatMutations';
import useRiwayatQueries from '@/hooks/website/riwayat/useRiwayatQueries';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RiwayatPage = () => {
  const { getAntrian, cancelReservasi, deleteRiwayat } = useRiwayatMutations();
  const { riwayatQuery } = useRiwayatQueries();
  const navigate = useNavigate();

  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  // Konfirmasi batalkan reservasi
  const onSubmit = (id) => {
    setPendingFormData(id);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
    cancelReservasi.mutate(pendingFormData, {
      onSuccess: () => {
        setShowUpdateAlert(false);
        setPendingFormData(null);
      },
    });
  };

  const handleCancel = () => {
    setShowUpdateAlert(false);
    setPendingFormData(null);
  };

  // Konfirmasi hapus riwayat
  const onDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    deleteRiwayat.mutate(selectedDeleteId, {
      onSuccess: () => {
        setShowDeleteAlert(false);
        setSelectedDeleteId(null);
      },
    });
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setSelectedDeleteId(null);
  };

  // Navigasi lihat antrian
  const handleLihatAntrian = (id) => {
    navigate(`/user/riwayat/${id}`);
  };

  if (getAntrian.isPending || cancelReservasi.isPending || deleteRiwayat.isPending)
    return <div>Loading...</div>;

  return (
    <section className="capitalize">
      <header className="content-center h-56 text-center bg-primary sm:py-10 sm:px-8 md:px-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Riwayat Reservasi</h1>
      </header>
      <div className="px-4 py-10 sm:px-6 md:px-32">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-2 py-3 text-sm border sm:text-base">Tanggal</th>
                <th className="px-2 py-3 text-sm border sm:text-base">Waktu</th>
                <th className="px-2 py-3 text-sm border sm:text-base">Spesialisasi</th>
                <th className="px-2 py-3 text-sm border sm:text-base">Nama</th>
                <th className="px-2 py-3 text-sm border sm:text-base">Status</th>
                <th className="px-2 py-3 text-sm border sm:text-base">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayatQuery.data &&
                riwayatQuery.data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="px-2 py-1 text-sm border sm:text-base">
                      {new Date(item.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-1 text-sm border sm:text-base">{item.appointmentTime}</td>
                    <td className="px-2 py-1 text-sm border sm:text-base">{item.Spesialisasi.nama}</td>
                    <td className="px-2 py-1 text-sm border sm:text-base">{item.nama}</td>
                    <td className="px-2 py-1 text-sm border sm:text-base">{item.status}</td>
                    <td className="flex items-center justify-center gap-2 px-2 py-1 border">
                      <button
                        disabled={item.status === 'selesai' || item.status === 'batal'}
                        className={`px-6 py-2 text-white rounded capitalize ${
                          item.status === 'selesai' || item.status === 'batal'
                            ? 'bg-gray-900 opacity-50 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        onClick={() => onSubmit(item.id)}
                      >
                        Batalkan
                      </button>
                      <button
                        disabled={item.status === 'batal'}
                        className={`px-6 py-2 text-white rounded bg-primary capitalize ${
                          item.status === 'batal' ? '!bg-gray-900 opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleLihatAntrian(item.id)}
                      >
                        No Antrean
                      </button>
                      {(item.status === 'batal' || item.status === 'selesai') && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Konfirmasi Batalkan */}
      {showUpdateAlert && (
        <CustomAlert
          title="Batalkan Reservasi?"
          message="Apakah Anda yakin ingin membatalkan reservasi? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Konfirmasi Hapus */}
      {showDeleteAlert && (
        <CustomAlert
          title="Hapus Riwayat?"
          message="Apakah Anda yakin ingin menghapus riwayat ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </section>
  );
};

export default RiwayatPage;
