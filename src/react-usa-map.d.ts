declare module 'react-usa-map' {
  import * as React from 'react';

  interface USAMapProps {
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
    width?: number | string;
    height?: number | string;
    title?: string;
    defaultFill?: string;
    customize?: Record<string, { fill?: string; clickHandler?: (event: React.MouseEvent<SVGElement>) => void }>;
  }

  const USAMap: React.FC<USAMapProps>;
  export default USAMap;
}
