import styles from './Icon.module.scss';
import * as polarisIcons from '@shopify/polaris-icons';

interface Props {
  source: React.ElementType | string;
  width?: number | string;
  height?: number | string;
}

function Icon({source, height = 20, width = 20}: Props) {
  // If source is a string, try to find the icon by name
  let SourceComponent: React.ElementType;
  
  if (typeof source === 'string') {
    // Look up the icon by name in the polarisIcons object
    SourceComponent = (polarisIcons as any)[source];
    if (!SourceComponent) {
      console.warn(`Icon "${source}" not found in @shopify/polaris-icons`);
      // Return empty fragment if icon not found
      return null;
    }
  } else {
    SourceComponent = source;
  }
  
  return <SourceComponent className={styles.Icon} style={{width, height}} />;
}

export default Icon;
