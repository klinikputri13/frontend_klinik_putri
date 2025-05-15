import { jadwalDokterSpesialisasiService } from "@/services";

export const getAll = async ({ page, limit, search }) => {
  const response = await jadwalDokterSpesialisasiService.getAll({ page, limit, search });
  return response;
}

export const getById = async (id) => {
  if (!id) {
    console.warn("getById dipanggil tanpa ID valid:", id);
    return null;
  }
  const response = await jadwalDokterSpesialisasiService.getById(id);
  return response;
};

export const create = async (data) => {
  const response = await jadwalDokterSpesialisasiService.create(data);
  return response.data;
}

export const edit = async (id, data) => {
  const response = await jadwalDokterSpesialisasiService.edit(id, data);
  return response.data;
}

export const remove = async (id) => {
  const response = await jadwalDokterSpesialisasiService.remove(id);
  return response.data;
}