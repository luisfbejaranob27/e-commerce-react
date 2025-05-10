import axios from "axios";
import {mapUserResponse} from "../utils/ItemMapper.ts";
import {Item} from "../models/Item.ts";
import {ApiError} from "../models/ApiError.ts";

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const getAllItems = async (): Promise<Item[]> =>
{
  try
  {
    const response = await axios.get(BASE_URL);
    return mapUserResponse(response.data);
  }
  catch (e)
  {
    handleException(e);
    throw e;
  }
}

export const getItemsByCategory = async (category: string): Promise<Item[]> =>
{
  try
  {
    const url = category ? `${BASE_URL}?categorySlug=${encodeURIComponent(category)}` : BASE_URL;
    const response = await axios.get(url);

    if (response.data && Array.isArray(response.data))
    {
      return mapUserResponse(response.data);
    }
    else if (response.data.products && Array.isArray(response.data.products))
    {
      return mapUserResponse(response.data.products);
    }
    else
    {
      throw new ApiError('Unexpected data format', {});
    }
  }
  catch (e)
  {
    handleException(e);
    throw e;
  }
};

const handleException = (e: unknown) =>
{
  if (axios.isAxiosError(e))
  {
    if (e.response)
    {
      console.log('e.response');
      console.log(e.response);
      throw new ApiError(
        e.response.data.message || 'Server response error',
        e.response.data.errors || {}
      );
    }
    else if (e.request)
    {
      console.error('Error request:', e.request);
    }
  }
  else
  {
    console.error('Error message:', e instanceof Error ? e.message : String(e));
  }
};
