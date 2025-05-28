"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { MovieListParams } from '@/type/MovieListParams';
import { Item } from '@/type/ListMovieRespone';
import { getListMovieByType } from '@/service/KKPhimService';

interface FilterParams {
  country?: string;
  category?: string;
  year?: string;
  type?: string;
  sort?: string;
  rating?: string;
  page?: string;
}

interface UseUrlMovieFilterReturn {
  movies: Item[];
  loading: boolean;
  error: string | null;
  filters: FilterParams;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  refetch: () => void;
}

export const useUrlMovieFilter = (): UseUrlMovieFilterReturn => {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  // Parse URL parameters
  const filters: FilterParams = {
    country: searchParams.get('country') || undefined,
    category: searchParams.get('category') || undefined,
    year: searchParams.get('year') || undefined,
    type: searchParams.get('type') || undefined,
    sort: searchParams.get('sort') || undefined,
    rating: searchParams.get('rating') || undefined,
    page: searchParams.get('page') || undefined,
  };

  // Convert URL filters to API parameters
  const convertToApiParams = useCallback((urlFilters: FilterParams): MovieListParams => {
    const apiParams: MovieListParams = {
      type_list: 'phim-le', // default
      page: parseInt(urlFilters.page || '1'),
      limit: 24,
      sort_field: 'modified.time',
      sort_type: 'desc'
    };

    // Map type
    if (urlFilters.type) {
      switch (urlFilters.type) {
        case 'phim-le':
          apiParams.type_list = 'phim-le';
          break;
        case 'phim-bo':
          apiParams.type_list = 'phim-bo';
          break;
        case 'hoat-hinh':
          apiParams.type_list = 'hoat-hinh';
          break;
        default:
          apiParams.type_list = 'phim-le';
      }
    }

    // Map category
    if (urlFilters.category && urlFilters.category !== 'tat-ca') {
      apiParams.category = urlFilters.category;
    }

    // Map country
    if (urlFilters.country && urlFilters.country !== 'tat-ca') {
      apiParams.country = urlFilters.country;
    }

    // Map year
    if (urlFilters.year && urlFilters.year !== 'tat-ca') {
      apiParams.year = parseInt(urlFilters.year);
    }

    // Map sort
    if (urlFilters.sort) {
      switch (urlFilters.sort) {
        case 'moi-nhat':
          apiParams.sort_field = '_id';
          apiParams.sort_type = 'desc';
          break;
        case 'moi-cap-nhat':
          apiParams.sort_field = 'modified.time';
          apiParams.sort_type = 'desc';
          break;
        case 'nam-moi':
          apiParams.sort_field = 'year';
          apiParams.sort_type = 'desc';
          break;
        case 'nam-cu':
          apiParams.sort_field = 'year';
          apiParams.sort_type = 'asc';
          break;
      }
    }

    // Map rating/language
    if (urlFilters.rating) {
      switch (urlFilters.rating) {
        case 'vietsub':
          apiParams.sort_lang = 'vietsub';
          break;
        case 'thuyet-minh':
          apiParams.sort_lang = 'thuyet-minh';
          break;
        case 'long-tieng':
          apiParams.sort_lang = 'long-tieng';
          break;
      }
    }

    return apiParams;
  }, []);

  // Fetch movies based on URL parameters
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiParams = convertToApiParams(filters);
      console.log('API Params:', apiParams); // Debug log
      
      const response = await getListMovieByType(apiParams);
      
      if (response.data?.items) {
        setMovies(response.data.items);
        
        // Calculate pagination
        const totalItems = response.data.items.length;
        const currentPage = apiParams.page || 1;
        const limit = apiParams.limit || 24;
        const totalPages = Math.max(1, Math.ceil(totalItems / limit));
        
        setPagination({
          currentPage,
          totalPages,
          totalItems
        });
      } else {
        setMovies([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0
        });
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.');
      setMovies([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
      });
    } finally {
      setLoading(false);
    }
  }, [filters, convertToApiParams]);

  // Fetch movies when URL parameters change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    filters,
    pagination,
    refetch: fetchMovies
  };
};
