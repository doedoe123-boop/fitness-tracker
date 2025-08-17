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
  fetchById: (id: string) => Promise<Exercise | null>;
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
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
      
      // Return mock data as fallback
      return getMockExercises(type, param);
    } finally {
      setLoading(false);
    }
  };

  const getMockExercises = (type?: string, param?: string) => {
    const mockExercises = [
      {
        id: '1',
        name: 'Push-ups',
        bodyPart: 'chest',
        equipment: 'body weight',
        target: 'pectorals',
        gifUrl: '/src/assets/exercises/push-ups.gif'
      },
      {
        id: '2',
        name: 'Squats',
        bodyPart: 'legs',
        equipment: 'body weight',
        target: 'quadriceps',
        gifUrl: '/src/assets/exercises/squats.gif'
      },
      {
        id: '3',
        name: 'Lunges',
        bodyPart: 'legs',
        equipment: 'body weight',
        target: 'glutes',
        gifUrl: '/src/assets/exercises/lunges.gif'
      },
      {
        id: '4',
        name: 'Yoga',
        bodyPart: 'cardio',
        equipment: 'body weight',
        target: 'flexibility',
        gifUrl: '/src/assets/exercises/yoga.gif'
      },
      {
        id: '5',
        name: 'Cycling',
        bodyPart: 'cardio',
        equipment: 'machine',
        target: 'cardiovascular system',
        gifUrl: '/src/assets/exercises/cycling.gif'
      },
      {
        id: '6',
        name: 'Running',
        bodyPart: 'cardio',
        equipment: 'body weight',
        target: 'cardiovascular system',
        gifUrl: '/src/assets/exercises/running.gif'
      },
      {
        id: '7',
        name: 'Stretching',
        bodyPart: 'back',
        equipment: 'body weight',
        target: 'spine',
        gifUrl: '/src/assets/exercises/stretching.gif'
      },
      {
        id: '8',
        name: 'Jump Rope',
        bodyPart: 'cardio',
        equipment: 'rope',
        target: 'cardiovascular system',
        gifUrl: '/src/assets/exercises/rope.gif'
      }
    ];

    if (type === 'bodyPartList') {
      return ['chest', 'legs', 'cardio', 'back', 'shoulders', 'arms'];
    }

    if (type === 'bodyPart' && param) {
      return mockExercises.filter(ex => ex.bodyPart === param);
    }

    if (type === 'id' && param) {
      return mockExercises.find(ex => ex.id === param) || null;
    }

    return mockExercises;
  };

  const fetchByBodyPart = async (bodyPart: string) => {
    const data = await fetchExercises('bodyPart', bodyPart);
    setExercises(data);
  };

  const fetchBodyParts = async () => {
    const data = await fetchExercises('bodyPartList');
    setBodyParts(data);
  };

  const fetchById = async (id: string): Promise<Exercise | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExercises('id', id);
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exercise');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all exercises and body parts on mount
  useEffect(() => {
    const initializeData = async () => {
      const [exercisesData, bodyPartsData] = await Promise.all([
        fetchExercises(),
        fetchExercises('bodyPartList')
      ]);
      setExercises(exercisesData);
      setBodyParts(bodyPartsData);
    };

    initializeData();
  }, []);

  return {
    exercises,
    bodyParts,
    loading,
    error,
    fetchByBodyPart,
    fetchBodyParts,
    fetchById,
  };
};

export default useExercises;