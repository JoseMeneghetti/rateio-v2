import { IRateio } from "@/store/rateios/rateios.reducer";
import { api } from "../config";
import { Rateio } from "@prisma/client";

const rateioSave = async (
  selectedRateio: IRateio,
  password: string,
  whiteListPermission: boolean
) => {
  const data = { ...selectedRateio, password, whiteListPermission };
  try {
    const response = await api({
      method: "post",
      url: "/rateio/create",
      data: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getRateios = async (userId: string) => {
  try {
    const response = await api({
      method: "get",
      url: `/rateio/find-all/`,
      params: {
        userId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getOneRateio = async (id: string, userId?: string) => {
  try {
    const response = await api({
      method: "get",
      url: `/rateio/find-one/`,
      params: {
        userId,
        id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const checkRateio = async (id: string, userId?: string): Promise<Rateio> => {
  try {
    const response = await api({
      method: "get",
      url: `/rateio/check/`,
      params: {
        id,
        userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rateioAuth = async (
  id: string,
  password: string,
  userId?: string
): Promise<Rateio> => {
  try {
    const response = await api({
      method: "post",
      url: `/rateio/auth-rateio/`,
      data: {
        id,
        password,
        userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rateioEdit = async (selectedRateio: IRateio, id: string) => {
  try {
    const response = await api({
      method: "post",
      url: "/rateio/edit",
      data: selectedRateio,
      params: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  rateioSave,
  getRateios,
  getOneRateio,
  checkRateio,
  rateioAuth,
  rateioEdit,
};
