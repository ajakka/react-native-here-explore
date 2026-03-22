import { useState, useCallback, useMemo, useRef } from 'react';

import type {
  GeoPolyline,
  OnRouteCalculated,
  RouteOption,
  RouteResultType,
} from '../types';
import NativeRouting from './specs/NativeRouting';

export async function calculateRoute(
  waypoints: GeoPolyline,
  routeOption: RouteOption
): Promise<OnRouteCalculated> {
  const result = await NativeRouting.calculateRoute(waypoints, routeOption);
  return result as OnRouteCalculated;
}

export async function cancel(): Promise<boolean> {
  return await NativeRouting.cancel();
}

type Params = {
  waypoints: GeoPolyline;
  routeOption: RouteOption;
};

export function useRouting({ waypoints, routeOption }: Params) {
  const [route, setRoute] = useState<RouteResultType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const abortedRef = useRef(false);

  const _calculate = useCallback(() => {
    abortedRef.current = false;
    setIsPending(true);
    setError(null);

    calculateRoute(waypoints, routeOption)
      .then((result) => {
        if (abortedRef.current) return;
        if (result.routingError == null) {
          setRoute(result.routes[0] ?? null);
        } else {
          setError(new Error(`Routing error: ${result.routingError}`));
          setRoute(null);
        }
      })
      .catch((err) => {
        if (abortedRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setRoute(null);
      })
      .finally(() => {
        if (!abortedRef.current) setIsPending(false);
      });
  }, [waypoints, routeOption]);

  const _cancel = useCallback(() => {
    abortedRef.current = true;
    setIsPending(false);
    cancel();
  }, []);

  return useMemo(
    () => ({
      route,
      error,
      isPending,
      calculate: _calculate,
      cancel: _cancel,
    }),
    [route, error, isPending, _calculate, _cancel]
  );
}
