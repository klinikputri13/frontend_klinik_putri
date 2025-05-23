import { doctorService } from "@/services"

export const getAll = async ({ page, limit, search }) => {
  const response = await doctorService.getAll({ page, limit, search });
  return response;
}

export const takeAll = async () => {
  const response = await doctorService.takeAll();
  return response;
}

export const getById = async (id) => {
  const response = await doctorService.getById(id);
  return response;
}

export const create = async (data) => {
  const { image, spesialisasiId, name, active, ...others } = data;
  const payload = {
    nama: name,
    spesialisasiId: spesialisasiId,
    aktif: active,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await doctorService.create(payload);
  return response.data;
}

export const edit = async (id, data) => {
  const { image, spesialisasiId, name, active, ...others } = data;
  const payload = {
    nama: name,
    spesialisasiId: spesialisasiId,
    aktif: active,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await doctorService.edit(id, payload);
  return response.data;
}

export const remove = async (id) => {
  const response = await doctorService.remove(id);
  return response.data;
}

export const uploadFoto = async (id, formData) => {
  const response = await doctorService.uploadFoto(id, formData);
  return response.data;
}