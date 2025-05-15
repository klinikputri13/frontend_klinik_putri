import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomAlert from '@/components/ui/CustomAlert';
import { useState } from "react";
import useSpesialisasiQueries from "@/hooks/admin/spesialisasi/useSpesialisasiQueries";
import useDoctorQueries from "@/hooks/admin/doctor/useDoctorQueries";
import useJadwalDokterSpesialisasiMutations from "@/hooks/admin/jadwal-dokter/spesialisasi/useJadwalDokterSpesialisasiMutations";

const doctorFormSchema = z.object({
  spesialisasiId: z.string().optional(),
  doctorId: z.string().optional(),
});

const JadwalDokterSpesialisForm = ({ data, formMode }) => {
  const navigate = useNavigate();
  const { create, edit } = useJadwalDokterSpesialisasiMutations()
  const { spesialisasiTakeAllQueries } = useSpesialisasiQueries();
  const { doctorTakeAllQueries } = useDoctorQueries();
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      doctorId: data?.doctorId || "",
      spesialisasiId: data?.spesialisasiId || "",
    },
    values: data ? {
      doctorId: data?.doctorId,
      spesialisasiId: data?.spesialisasiId,
    } : undefined,
  });

  const onSubmit = (formData) => {
    setPendingFormData(formData);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
  try {
    if (formMode === "edit") {
      edit.mutate(
        { id: data.id, formData: pendingFormData },
        {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/jadwal-dokter/spesialisasi");
          },
        }
      );
    } else {
      // Cukup panggil mutate saja, onSuccess global akan menangani toast + invalidate
      create.mutate(pendingFormData);
      setShowUpdateAlert(false);
      setPendingFormData(null);
      navigate("/admin/jadwal-dokter/spesialisasi");
    }
  } catch (error) {
    console.error("Form submission error:", error);
  }
};
  const handleCancel = () => {
    setShowUpdateAlert(false);
    setPendingFormData(null);
  };

  
  return (
    <section className="px-12 capitalize">
      <header className="py-9">
        <h1 className="text-3xl font-medium text-primary">
          {`${formMode === "edit" ? "Ubah" : "Tambahkan"} jadwal dokter spesialis`}
        </h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-1/2 p-10 space-y-6 bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <label htmlFor="spesialisasiId" className="text-xl font-medium text-primary">Layanan Spesialisasi</label>
          <select id="spesialisasiId" {...register("spesialisasiId")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
            <option value="" disabled>
              {spesialisasiTakeAllQueries.isPending ? "Loading..." : "Pilih spesialisasi"}
            </option>
            {spesialisasiTakeAllQueries.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.spesialisasiId && <small className="text-sm text-red-500">{errors.spesialisasiId.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="doctorId" className="text-xl font-medium text-primary">Nama Dokter</label>
          <select id="doctorId" {...register("doctorId")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
            <option value="" disabled>
              {doctorTakeAllQueries.isPending ? "Loading..." : "Pilih dokter"}
            </option>
            {doctorTakeAllQueries.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.doctorId && <small className="text-sm text-red-500">{errors.doctorId.message}</small>}
        </div>
        <div className="flex items-center justify-end gap-5">
          <Link to="/admin/jadwal-dokter/spesialisasi" className="px-6 py-2 font-medium border rounded-lg border-primary text-primary">Batal</Link>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">
            {formMode === "edit" ? (edit.isPending ? "Loading..." : "Ubah") : (create.isPending ? "Loading..." : "Simpan")}
          </button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title={`${formMode === "edit" ? "Ubah" : "Tambahkan"} jadwal dokter spesialis`}
          message={`Apakah Anda yakin ingin ${formMode === "edit" ? "mengubah" : "menambahkan"} jadwal dokter spesialis ini?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default JadwalDokterSpesialisForm;