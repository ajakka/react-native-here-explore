<h1 align="center">
    <strong>react-native-here-explore</strong>
</h1>

<p align="center">
    Integrate HERE Maps 🌍 Into React Native
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-native-here-explore?color=00afaa&style=flat-square)](https://www.npmjs.com/package/react-native-here-explore)
[![license](https://img.shields.io/npm/l/react-native-here-explore?style=flat-square)](./LICENSE)
[![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?style=flat-square)](https://github.com/ajakka/react-native-here-explore)

</div>

<div align="center">

[Introduction](#introduction) •
[Installation](#installation) •
[Example](#example) •
[Documentation](#documentation) •
[Contributing](#contributing) •
[License](#license)

</div>

## Introduction

The react-native-here-explore library is designed to integrate HERE Maps SDK's features into React Native, one feature at a time.
Crafted from scratch utilizing the latest native languages (Kotlin/Swift) and built on the React Native New Architecture, it ensures a streamlined installation process despite the manual approach required for the SDKs themselves.

<div align="center">
  <img src="docs/assets/screenshot.png" alt="Map Screenshot" title="Map Screenshot" width="25%">
</div>

## Installation

```sh
# using npm
npm install react-native-here-explore

# using yarn
yarn add react-native-here-explore
```

See the [Installation Guide](https://ajakka.net/react-native-here-explore/docs/getting-started/installation) for the full setup guide including HERE SDK downloads and platform configuration.

## Example

```tsx
import React from 'react';
import { Map, Marker } from 'react-native-here-explore';

export default function App() {
  return (
    <Map
      mapScheme="NORMAL_NIGHT"
      zoomValue={12}
      geoCoordinates={{ latitude: 31.6913827, longitude: -8.4413898 }}
    >
      <Marker
        geoCoordinates={{ latitude: 31.6913827, longitude: -8.4413898 }}
        image={require('./assets/pin.png')}
      />
    </Map>
  );
}
```

## Documentation

Full documentation is available at [ajakka.net/react-native-here-explore](https://ajakka.net/react-native-here-explore/).

### Components

- [Map](https://ajakka.net/react-native-here-explore/docs/components/map)
- [Marker](https://ajakka.net/react-native-here-explore/docs/components/marker)
- [Polyline](https://ajakka.net/react-native-here-explore/docs/components/polyline)
- [Polygon](https://ajakka.net/react-native-here-explore/docs/components/polygon)
- [Arrow](https://ajakka.net/react-native-here-explore/docs/components/arrow)

### API

- [HEREConfig](https://ajakka.net/react-native-here-explore/docs/api/here-config)
- [useRouting](https://ajakka.net/react-native-here-explore/docs/hooks/use-routing)
- [calculateRoute](https://ajakka.net/react-native-here-explore/docs/api/calculate-route)
- [Types](https://ajakka.net/react-native-here-explore/docs/api/types)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT License — Copyright (c) 2023 AnyFikra

See [LICENSE](./LICENSE) for full text.
