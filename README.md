<h1 align="center">
    <strong>react-native-maps-here</strong>
</h1>

<p align="center">
    Integrate Here Maps 🌍 Into React Native
</p>

<div align="center">

[Introduction](#introduction) •
[Installation](#installation) •
[Example](#example) •
[Documentation](#documentation) •
[Contributing](#contributing) •
[License](#license)

</div>

## Introduction

The react-native-maps-here library is designed to integrate HERE Maps SDK's features into React Native, one feature at a time.
Crafted from scratch utilizing latest languages in the native domain (Kotlin/Swift), it ensures a streamlined installation process despite the manual approach required for the SDKs themselves.
This library bridges the gap, bringing mapping capabilities into your React Native applications with ease and efficiency.

<div align="center">
  <img src="docs/assets/screenshot.png" alt="Map Screenshot" title="Map Screenshot" width="25%">
</div>

## Installation

Checkout [INSTALLATION.md](docs/INSTALLATION.md) for more details

## Example

This is an example snippet Using `Map` to show the Map

```tsx
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Map } from 'react-native-maps-here';

export default function App() {
  return (
    <Map
      mapScheme="NORMAL_NIGHT"
      zoomValue={5}
      coordinates={{ lat: 31.6913827, lon: -8.4413898 }}
    />
  );
}
```

## Documentation

### Components

- [Map](docs/components/MapsHereView.md)

- [Arrow](docs/components/ArrowView.md)

- [Marker](docs/components/MarkerView.md)

- [Polygon](docs/components/PolygonView.md)

- [Polyline](docs/components/PolylineView.md)

- [Routing](docs/components/RoutingView.md)

### Modules

- [MapsHereConfig](docs/modules/MapsHereConfig.md)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

```
MIT License

Copyright (c) 2023 Abderrahim Ajakka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
