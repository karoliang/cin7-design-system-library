import React from 'react';
import { Button, Popover, ActionList, Icon } from '@shopify/polaris';
import { 
  SunIcon,
  MoonIcon,
  CheckCircleIcon,
  SettingsIcon
} from '@shopify/polaris-icons';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [active, setActive] = React.useState(false);

  const toggleActive = React.useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button
      variant="plain"
      icon={resolvedTheme === 'dark' ? MoonIcon : SunIcon}
      onClick={toggleActive}
      aria-label="Theme switcher"
    />
  );

  const themeOptions = [
    {
      content: 'Light',
      icon: SunIcon,
      suffix: theme === 'light' ? <Icon source={CheckCircleIcon} /> : undefined,
      onAction: () => {
        setTheme('light');
        setActive(false);
      },
    },
    {
      content: 'Dark',
      icon: MoonIcon,
      suffix: theme === 'dark' ? <Icon source={CheckCircleIcon} /> : undefined,
      onAction: () => {
        setTheme('dark');
        setActive(false);
      },
    },
    {
      content: 'System',
      icon: SettingsIcon,
      suffix: theme === 'auto' ? <Icon source={CheckCircleIcon} /> : undefined,
      onAction: () => {
        setTheme('auto');
        setActive(false);
      },
    },
  ];

  return (
    <div className={styles.ThemeSwitcher}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={themeOptions}
        />
      </Popover>
    </div>
  );
}