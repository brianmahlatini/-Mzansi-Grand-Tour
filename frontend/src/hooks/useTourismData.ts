// Purpose: Loads all tourism API data once and provides a typed data state for
// pages without duplicating fetch orchestration across route modules.
import { useEffect, useState } from "react";
import { getDestinations, getExperiences, getPackages, getStories } from "../api/tourismApi";
import type { TourismData } from "../types/tourism";

const emptyData: TourismData = {
  destinations: [],
  experiences: [],
  packages: [],
  stories: []
};

interface TourismDataState extends TourismData {
  isLoading: boolean;
}

export function useTourismData(): TourismDataState {
  const [data, setData] = useState<TourismDataState>({ ...emptyData, isLoading: true });

  useEffect(() => {
    let isMounted = true;

    Promise.all([getDestinations(), getExperiences(), getPackages(), getStories()])
      .then(([destinations, experiences, packages, stories]) => {
        if (isMounted) {
          setData({ destinations, experiences, packages, stories, isLoading: false });
        }
      })
      .catch(() => {
        if (isMounted) {
          setData((current) => ({ ...current, isLoading: false }));
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}
