import axios from "axios";
import {mapUserResponse} from "../utils/ItemMapper.ts";
import {Item} from "../models/Item.ts";
import {ApiError} from "../models/ApiError.ts";

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return mapUserResponse(response.data);
  }
  catch (e) {
    handleException(e);
    throw e;
  }
}

export const getItems = async (category: string): Promise<Item[]> => {
  try {
    const response = await axios.get(`${BASE_URL}${category ? `?categorySlug=${category}` : ''}`);
    return mapUserResponse(response.data.products);
  }
  catch (e) {
    handleException(e);
    throw e;
  }
}

const handleException = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      console.log('e.response');
      console.log(e.response);
      throw new ApiError(
        e.response.data.message || 'Server response error',
        e.response.data.errors || {}
      );
    } else if (e.request) {
      console.error('Error request:', e.request);
    }
  } else {
    console.error('Error message:', e instanceof Error ? e.message : String(e));
  }
};
