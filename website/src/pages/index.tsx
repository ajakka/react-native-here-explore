import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: 'Map Display',
    emoji: '🗺️',
    description:
      'Render interactive HERE Maps with multiple schemes — day, night, satellite, hybrid, logistics and more.',
  },
  {
    title: 'Markers',
    emoji: '📍',
    description:
      'Place custom image markers at any coordinate with full control over scale, size, and anchor point.',
  },
  {
    title: 'Polylines',
    emoji: '〰️',
    description:
      'Draw solid or dashed lines connecting coordinates. Control color, width, cap style, and gaps.',
  },
  {
    title: 'Polygons',
    emoji: '🔷',
    description:
      'Fill regions on the map using coordinate lists or circles with customizable fill and outline.',
  },
  {
    title: 'Arrows',
    emoji: '➡️',
    description:
      'Render directional arrows along any polyline path to indicate routes or directions.',
  },
  {
    title: 'Routing',
    emoji: '🚗',
    description:
      'Calculate routes between waypoints for 10 transport modes including car, truck, EV, bicycle, and more.',
  },
];

function Feature({ title, emoji, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.featureEmoji}>{emoji}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.badges}>
          <img
            src="https://img.shields.io/npm/v/react-native-here-explore?color=00afaa&style=flat-square"
            alt="npm version"
          />
          <img
            src="https://img.shields.io/npm/l/react-native-here-explore?style=flat-square"
            alt="license"
          />
          <img
            src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?style=flat-square"
            alt="platforms"
          />
        </div>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/ajakka/react-native-here-explore"
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="HERE Maps for React Native"
      description="Integrate HERE Maps SDK Explore Edition into your React Native app with Kotlin and Swift native modules."
    >
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
