import api from "../api";

export const fetchRiwayat = async (filters = {}) => {
  try {
    const response = await api.get('/riwayat/list', { params: filters });
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching riwayat:", error);
    throw error;
  }
};


export const cancelReservasi = async (id) => {
  try {
    const response = await api.post(`/riwayat/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling reservasi:", error);
    throw error;
  }
};

export const getAntrian = async (id) => {
  try {
    const response = await api.get(`/riwayat/antrian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching antrian:", error);
    throw error;
  }
};

export const getRiwayatById = async (id) => {
  try {
    const response = await api.get(`/riwayat/antrian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching riwayat by ID:", error);
    throw error;
  }
};

export const deleteRiwayat = async (id) => {
  try {
    const response = await api.delete(`/riwayat/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting riwayat:", error);
    throw error;
  }
};