import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  target: string;
  gifUrl?: string;
}

interface UseExercisesReturn {
  exercises: Exercise[];
  bodyParts: string[];
  loading: boolean;
  error: string | null;
  fetchByBodyPart: (bodyPart: string) => Promise<void>;
  fetchBodyParts: () => Promise<void>;
}

export const useExercises = (): UseExercisesReturn => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = async (type?: string, param?: string) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/exercises`;
      if (type && param) {
        url = `${BASE_URL}/exercises?type=${type}&param=${param}`;
      } else if (type) {
        url = `${BASE_URL}/exercises?type=${type}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch exercises');
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchByBodyPart = async (bodyPart: string) => {
    const data = await fetchExercises('bodyPart', bodyPart);
    setExercises(data);
  };

  const fetchBodyParts = async () => {
    const data = await fetchExercises('bodyPartList');
    setBodyParts(data);
  };

  // Fetch all exercises on mount
  useEffect(() => {
    const fetchAllExercises = async () => {
      const data = await fetchExercises();
      setExercises(data);
    };

    fetchAllExercises();
  }, []);

  return {
    exercises,
    bodyParts,
    loading,
    error,
    fetchByBodyPart,
    fetchBodyParts,
  };
};

export default useExercises;