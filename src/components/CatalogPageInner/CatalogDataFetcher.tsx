"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL_WC, consumerKey, consumerSecret } from "@/constants/api";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";
import { useBrandsQuery } from "@/queries/useBrandsQuery";
import { useAttributesQuery } from "@/queries/useAttributesQuery";

export const useCatalogDataFetcher = () => {
  const { setAllBrands, setAllCategories, setBrands, setAttributes } =
    useProductFilterStore();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL_WC}products/categories?per_page=100`,
        {
          headers: {
            Authorization: "Basic " + btoa(`${consumerKey}:${consumerSecret}`),
          },
        }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (categoriesData) setAllCategories(categoriesData);
  }, [categoriesData, setAllCategories]);

  const { data: brandsData } = useBrandsQuery();
  useEffect(() => {
    if (brandsData?.items) setBrands(brandsData.items);
  }, [brandsData, setBrands]);

  const { data: attributesData } = useAttributesQuery();
  useEffect(() => {
    if (attributesData) setAttributes(attributesData);
  }, [attributesData, setAttributes]);

  useEffect(() => {
    if (brandsData && brandsData.length > 0) {
      setAllBrands(brandsData);
    }
  }, [brandsData, setAllBrands]);

  return {
    categoriesData,
    brandsData,
    attributesData,
  };
};
