import ContentLoader from 'react-content-loader';

export const ImageGrid = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={800}
    viewBox="0 0 800 577"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="12" y="58" rx="2" ry="2" width="375" height="260" />
    <rect x="240" y="57" rx="2" ry="2" width="375" height="260" />
    <rect x="467" y="56" rx="2" ry="2" width="375" height="260" />
    <rect x="12" y="283" rx="2" ry="2" width="375" height="260" />
    <rect x="240" y="281" rx="2" ry="2" width="375" height="260" />
    <rect x="468" y="279" rx="2" ry="2" width="375" height="260" />
  </ContentLoader>
);
