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
    const url = `${BASE_URL}?categorySlug=${encodeURIComponent(category)}`;
    console.log(`Fetching items for category: ${category}, URL: ${url}`);

    const response = await axios.get(url);
    console.log('Response data structure:', JSON.stringify(response.data).substring(0, 200) + '...');

    let itemsData: any[] = [];

    if (Array.isArray(response.data))
    {
      itemsData = response.data;
    }
    else if (response.data.products && Array.isArray(response.data.products))
    {
      itemsData = response.data.products;
    }
    else if (response.data.items && Array.isArray(response.data.items))
    {
      itemsData = response.data.items;
    }
    else
    {
      console.error('Unexpected data format:', response.data);
      return [];
    }

    if (itemsData.length === 0)
    {
      console.warn(`No items found for category: ${category}`);
    }

    return mapUserResponse(itemsData);
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
