import axios from "axios";
import { DataType } from "./model/types";

export const API_URL = "http://localhost:3001/data";

export const getData = async (): Promise<DataType[]> => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const getDataDetail = async (id: number): Promise<DataType> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const postData = async (item: DataType) => {
  const response = await axios.post(API_URL, item);

  return response.data;
};

export const putData = async (id: number, item: DataType) => {
  try {
    await axios.put(`${API_URL}/${id}`, item);
  } catch (error) {
    console.error("Error", error);
  }
};

export const deleteData = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
