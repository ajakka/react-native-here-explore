export type RouteOptionType =
  | 'CarOptions'
  | 'PedestrianOptions'
  | 'TruckOptions'
  | 'ScooterOptions'
  | 'BicycleOptions'
  | 'TaxiOptions'
  | 'EVCarOptions'
  | 'EVTruckOptions'
  | 'BusOptions'
  | 'PrivateBusOptions';

export class RouteOption {
  private constructor(public readonly type: RouteOptionType) {}

  static car(): RouteOption {
    return new RouteOption('CarOptions');
  }

  static pedestrian(): RouteOption {
    return new RouteOption('PedestrianOptions');
  }

  static truck(): RouteOption {
    return new RouteOption('TruckOptions');
  }

  static scooter(): RouteOption {
    return new RouteOption('ScooterOptions');
  }

  static bicycle(): RouteOption {
    return new RouteOption('BicycleOptions');
  }

  static taxi(): RouteOption {
    return new RouteOption('TaxiOptions');
  }

  static evCar(): RouteOption {
    return new RouteOption('EVCarOptions');
  }

  static evTruck(): RouteOption {
    return new RouteOption('EVTruckOptions');
  }

  static bus(): RouteOption {
    return new RouteOption('BusOptions');
  }

  static privateBus(): RouteOption {
    return new RouteOption('PrivateBusOptions');
  }
}
