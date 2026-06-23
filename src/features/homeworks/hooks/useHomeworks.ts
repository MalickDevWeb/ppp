import { useState, useEffect, useCallback } from 'react';
import { Homework, CreateHomeworkCommand } from '../domain/Homework';
import { 
  getHomeworksUseCase, 
  addHomeworkUseCase, 
  submitHomeworkUseCase,
  startHomeworkUseCase,
  advanceHomeworkProgressUseCase
} from '../infrastructure/config/dependencies';

export function useHomeworks() {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeworks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHomeworksUseCase();
      setHomeworks(data);
    } catch (err: any) {
      setError(err.message || 'Impossible de charger les devoirs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeworks();
  }, [fetchHomeworks]);

  const addHomework = async (cmd: CreateHomeworkCommand) => {
    setIsAdding(true);
    setError(null);
    try {
      await addHomeworkUseCase(cmd);
      await fetchHomeworks();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const startHomework = async (id: string) => {
    try {
      await startHomeworkUseCase(id);
      await fetchHomeworks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const advanceProgress = async (id: string, amount: number) => {
    try {
      await advanceHomeworkProgressUseCase(id, amount);
      await fetchHomeworks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const submitHomework = async (id: string, file: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitHomeworkUseCase(id, file);
      await fetchHomeworks();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    homeworks,
    isLoading,
    isAdding,
    isSubmitting,
    error,
    addHomework,
    submitHomework,
    startHomework,
    advanceProgress,
    fetchHomeworks
  };
}

