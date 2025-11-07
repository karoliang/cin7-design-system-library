// New ColorPicker variants to be integrated into codeVariants.ts
// These should be added to the colorPickerExamples object

export const newColorPickerVariants = {
  withhexinput: {
    react: `import { ColorPicker, TextField } from '@shopify/polaris';
import { useState } from 'react';

function ColorPickerWithHexExample() {
  const [color, setColor] = useState({
    hue: 120,
    saturation: 0.8,
    brightness: 0.9,
    alpha: 1,
  });

  const hexValue = \`#\${Math.round(color.hue).toString(16).padStart(2, '0')}\${Math.round(color.saturation * 255).toString(16).padStart(2, '0')}\${Math.round(color.brightness * 255).toString(16).padStart(2, '0')}\`;

  return (
    <div>
      <ColorPicker onChange={setColor} color={color} />
      <div style={{ marginTop: '16px' }}>
        <TextField
          label="Hex value"
          value={hexValue}
          readOnly
          helpText="Current color in hexadecimal format"
        />
      </div>
    </div>
  );
}

export default ColorPickerWithHexExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const colorInput = $('#color-input');
const hexDisplay = $('#hex-display');

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

on(colorInput, 'input', (e) => {
  const color = e.target.value;
  hexDisplay.value = color;
  EventBus.emit('color:changed', { hex: color });
});`,
    extjs: `Ext.create('Ext.form.FieldContainer', {
  layout: 'vbox',
  items: [{
    xtype: 'colorfield',
    fieldLabel: 'Select Color',
    value: '78CC78',
    listeners: {
      change: function(field, color) {
        const hexField = this.up('fieldcontainer').down('textfield');
        hexField.setValue('#' + color);
        EventBus.emit('color:selected', { hex: '#' + color });
      }
    }
  }, {
    xtype: 'textfield',
    fieldLabel: 'Hex Value',
    readOnly: true,
    value: '#78CC78'
  }],
  renderTo: Ext.getBody()
});`,
    typescript: `import { ColorPicker, TextField } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

function ColorPickerWithHexExample(): JSX.Element {
  const [color, setColor] = useState<HSBColor>({
    hue: 120,
    saturation: 0.8,
    brightness: 0.9,
    alpha: 1,
  });

  const hexValue = \`#\${Math.round(color.hue).toString(16).padStart(2, '0')}\${Math.round(color.saturation * 255).toString(16).padStart(2, '0')}\${Math.round(color.brightness * 255).toString(16).padStart(2, '0')}\`;

  return (
    <div>
      <ColorPicker onChange={setColor} color={color} />
      <div style={{ marginTop: '16px' }}>
        <TextField
          label="Hex value"
          value={hexValue}
          readOnly
          helpText="Current color in hexadecimal format"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default ColorPickerWithHexExample;`
  },

  withpresets: {
    react: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

function ColorPickerWithPresetsExample() {
  const [color, setColor] = useState({
    hue: 200,
    saturation: 0.8,
    brightness: 0.9,
    alpha: 1,
  });

  const presets = [
    { color: { hue: 0, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 30, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 60, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 120, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 180, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 240, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 300, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 0, saturation: 0, brightness: 0.5, alpha: 1 } },
  ];

  return <ColorPicker onChange={setColor} color={color} presets={presets} />;
}

export default ColorPickerWithPresetsExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const presetColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#808080'];
const colorInput = $('#color-input');
const presetsContainer = $('#presets-container');

presetColors.forEach(color => {
  const preset = document.createElement('button');
  preset.style.backgroundColor = color;
  preset.className = 'color-preset';

  on(preset, 'click', () => {
    colorInput.value = color;
    EventBus.emit('color:changed', { hex: color });
  });

  presetsContainer.appendChild(preset);
});`,
    extjs: `Ext.create('Ext.picker.Color', {
  value: '00CCFF',
  colors: ['FF0000', 'FF7F00', 'FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF', '808080'],
  renderTo: Ext.getBody(),
  listeners: {
    select: function(picker, color) {
      EventBus.emit('color:selected', { hex: '#' + color });
    }
  }
});`,
    typescript: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

interface ColorPreset {
  color: {
    hue: number;
    saturation: number;
    brightness: number;
    alpha: number;
  };
}

function ColorPickerWithPresetsExample(): JSX.Element {
  const [color, setColor] = useState({
    hue: 200,
    saturation: 0.8,
    brightness: 0.9,
    alpha: 1,
  });

  const presets: ColorPreset[] = [
    { color: { hue: 0, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 30, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 60, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 120, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 180, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 240, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 300, saturation: 1, brightness: 1, alpha: 1 } },
    { color: { hue: 0, saturation: 0, brightness: 0.5, alpha: 1 } },
  ];

  return <ColorPicker onChange={setColor} color={color} presets={presets} />;
}

export default ColorPickerWithPresetsExample;`
  },

  withalpha: {
    react: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

function ColorPickerWithAlphaExample() {
  const [color, setColor] = useState({
    hue: 280,
    saturation: 0.9,
    brightness: 0.8,
    alpha: 0.7,
  });

  return (
    <div>
      <ColorPicker onChange={setColor} color={color} allowAlpha />
      <div style={{ marginTop: '16px' }}>
        <div style={{
          width: '100%',
          height: '60px',
          backgroundColor: \`hsla(\${color.hue}, \${color.saturation * 100}%, \${color.brightness * 100}%, \${color.alpha})\`,
          borderRadius: '8px',
          border: '1px solid #e1e3e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Alpha: {Math.round(color.alpha * 100)}%
        </div>
      </div>
    </div>
  );
}

export default ColorPickerWithAlphaExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const colorInput = $('#color-input');
const alphaSlider = $('#alpha-slider');
const preview = $('#color-preview');

function updatePreview() {
  const color = colorInput.value;
  const alpha = alphaSlider.value / 100;
  preview.style.backgroundColor = \`\${color}\${Math.round(alpha * 255).toString(16).padStart(2, '0')}\`;
  EventBus.emit('color:changed', { hex: color, alpha });
}

on(colorInput, 'input', updatePreview);
on(alphaSlider, 'input', updatePreview);`,
    extjs: `Ext.create('Ext.form.FieldContainer', {
  layout: 'vbox',
  items: [{
    xtype: 'colorfield',
    fieldLabel: 'Color',
    value: 'CC66CC',
    listeners: {
      change: function() {
        updatePreview();
      }
    }
  }, {
    xtype: 'slider',
    fieldLabel: 'Alpha',
    value: 70,
    minValue: 0,
    maxValue: 100,
    listeners: {
      change: function() {
        updatePreview();
      }
    }
  }, {
    xtype: 'displayfield',
    itemId: 'preview',
    fieldLabel: 'Preview'
  }],
  renderTo: Ext.getBody()
});

function updatePreview() {
  // Preview update logic
}`,
    typescript: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

function ColorPickerWithAlphaExample(): JSX.Element {
  const [color, setColor] = useState<HSBColor>({
    hue: 280,
    saturation: 0.9,
    brightness: 0.8,
    alpha: 0.7,
  });

  return (
    <div>
      <ColorPicker onChange={setColor} color={color} allowAlpha />
      <div style={{ marginTop: '16px' }}>
        <div style={{
          width: '100%',
          height: '60px',
          backgroundColor: \`hsla(\${color.hue}, \${color.saturation * 100}%, \${color.brightness * 100}%, \${color.alpha})\`,
          borderRadius: '8px',
          border: '1px solid #e1e3e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color.brightness > 0.5 ? '#000' : '#fff'
        }}>
          Alpha: {Math.round(color.alpha * 100)}%
        </div>
      </div>
    </div>
  );
}

export default ColorPickerWithAlphaExample;`
  },

  productcolorcustomizer: {
    react: `import { ColorPicker, Card, BlockStack, Button, Label } from '@shopify/polaris';
import { useState } from 'react';

function ProductColorCustomizer() {
  const [primaryColor, setPrimaryColor] = useState({
    hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [secondaryColor, setSecondaryColor] = useState({
    hue: 30, saturation: 0.7, brightness: 1, alpha: 1,
  });
  const [accentColor, setAccentColor] = useState({
    hue: 0, saturation: 1, brightness: 0.8, alpha: 1,
  });

  const presets = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: { hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1 },
        secondary: { hue: 180, saturation: 0.5, brightness: 1, alpha: 1 },
        accent: { hue: 25, saturation: 1, brightness: 0.8, alpha: 1 }
      }
    },
  ];

  const applyPreset = (preset) => {
    setPrimaryColor(preset.colors.primary);
    setSecondaryColor(preset.colors.secondary);
    setAccentColor(preset.colors.accent);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <div>
          {presets.map((preset, index) => (
            <Button key={index} onClick={() => applyPreset(preset)} size="slim">
              {preset.name}
            </Button>
          ))}
        </div>
        <div>
          <Label>Primary Color</Label>
          <ColorPicker onChange={setPrimaryColor} color={primaryColor} />
        </div>
        <div>
          <Label>Secondary Color</Label>
          <ColorPicker onChange={setSecondaryColor} color={secondaryColor} />
        </div>
        <div>
          <Label>Accent Color</Label>
          <ColorPicker onChange={setAccentColor} color={accentColor} />
        </div>
      </BlockStack>
    </Card>
  );
}

export default ProductColorCustomizer;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const colors = {
  primary: '#3399FF',
  secondary: '#FFB84D',
  accent: '#FF3333'
};

const primaryInput = $('#primary-color');
const secondaryInput = $('#secondary-color');
const accentInput = $('#accent-color');

function applyPreset(presetName) {
  const presets = {
    ocean: { primary: '#3399FF', secondary: '#66CCCC', accent: '#FF8833' },
    forest: { primary: '#66A366', secondary: '#99CC99', accent: '#FFAA33' }
  };

  const preset = presets[presetName];
  primaryInput.value = preset.primary;
  secondaryInput.value = preset.secondary;
  accentInput.value = preset.accent;

  EventBus.emit('colors:updated', preset);
}

on($('#ocean-preset'), 'click', () => applyPreset('ocean'));
on($('#forest-preset'), 'click', () => applyPreset('forest'));`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product Color Customizer',
  layout: 'vbox',
  items: [{
    xtype: 'toolbar',
    items: [{
      text: 'Ocean Blue',
      handler: function() { applyPreset('ocean'); }
    }, {
      text: 'Forest Green',
      handler: function() { applyPreset('forest'); }
    }]
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Primary Color',
    itemId: 'primary',
    value: '3399FF'
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Secondary Color',
    itemId: 'secondary',
    value: 'FFB84D'
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Accent Color',
    itemId: 'accent',
    value: 'FF3333'
  }],
  renderTo: Ext.getBody()
});`,
    typescript: `import { ColorPicker, Card, BlockStack, Button, Label } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

interface ColorPreset {
  name: string;
  colors: {
    primary: HSBColor;
    secondary: HSBColor;
    accent: HSBColor;
  };
}

function ProductColorCustomizer(): JSX.Element {
  const [primaryColor, setPrimaryColor] = useState<HSBColor>({
    hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [secondaryColor, setSecondaryColor] = useState<HSBColor>({
    hue: 30, saturation: 0.7, brightness: 1, alpha: 1,
  });
  const [accentColor, setAccentColor] = useState<HSBColor>({
    hue: 0, saturation: 1, brightness: 0.8, alpha: 1,
  });

  const presets: ColorPreset[] = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: { hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1 },
        secondary: { hue: 180, saturation: 0.5, brightness: 1, alpha: 1 },
        accent: { hue: 25, saturation: 1, brightness: 0.8, alpha: 1 }
      }
    }
  ];

  const applyPreset = (preset: ColorPreset): void => {
    setPrimaryColor(preset.colors.primary);
    setSecondaryColor(preset.colors.secondary);
    setAccentColor(preset.colors.accent);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <div>
          {presets.map((preset, index) => (
            <Button key={index} onClick={() => applyPreset(preset)} size="slim">
              {preset.name}
            </Button>
          ))}
        </div>
        <div>
          <Label>Primary Color</Label>
          <ColorPicker onChange={setPrimaryColor} color={primaryColor} />
        </div>
        <div>
          <Label>Secondary Color</Label>
          <ColorPicker onChange={setSecondaryColor} color={secondaryColor} />
        </div>
        <div>
          <Label>Accent Color</Label>
          <ColorPicker onChange={setAccentColor} color={accentColor} />
        </div>
      </BlockStack>
    </Card>
  );
}

export default ProductColorCustomizer;`
  },

  themecustomizer: {
    react: `import { ColorPicker, Card, BlockStack, Button, Label, InlineStack } from '@shopify/polaris';
import { useState } from 'react';

function ThemeCustomizer() {
  const [theme, setTheme] = useState({
    primary: { hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1 },
    secondary: { hue: 210, saturation: 0.5, brightness: 0.95, alpha: 1 },
    background: { hue: 0, saturation: 0, brightness: 1, alpha: 1 },
    text: { hue: 0, saturation: 0, brightness: 0.2, alpha: 1 },
    success: { hue: 120, saturation: 0.7, brightness: 0.9, alpha: 1 },
    warning: { hue: 45, saturation: 1, brightness: 0.9, alpha: 1 },
    error: { hue: 0, saturation: 0.8, brightness: 0.9, alpha: 1 },
  });

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200">
          <Button size="slim">Light</Button>
          <Button size="slim">Dark</Button>
        </InlineStack>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <BlockStack gap="300">
            <div>
              <Label>Primary</Label>
              <ColorPicker
                onChange={(color) => setTheme(prev => ({ ...prev, primary: color }))}
                color={theme.primary}
              />
            </div>
            <div>
              <Label>Background</Label>
              <ColorPicker
                onChange={(color) => setTheme(prev => ({ ...prev, background: color }))}
                color={theme.background}
              />
            </div>
          </BlockStack>
          <BlockStack gap="300">
            <div>
              <Label>Success</Label>
              <ColorPicker
                onChange={(color) => setTheme(prev => ({ ...prev, success: color }))}
                color={theme.success}
              />
            </div>
            <div>
              <Label>Error</Label>
              <ColorPicker
                onChange={(color) => setTheme(prev => ({ ...prev, error: color }))}
                color={theme.error}
              />
            </div>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default ThemeCustomizer;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const themeColors = {
  primary: '#3399FF',
  secondary: '#E6F2FF',
  background: '#FFFFFF',
  text: '#333333',
  success: '#66CC66',
  warning: '#FFCC33',
  error: '#FF6666'
};

function applyTheme(themeName) {
  const themes = {
    light: { background: '#FFFFFF', text: '#333333' },
    dark: { background: '#1A1A1A', text: '#E6E6E6' }
  };

  const theme = themes[themeName];
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;

  EventBus.emit('theme:changed', { theme: themeName, colors: theme });
}

on($('#light-theme'), 'click', () => applyTheme('light'));
on($('#dark-theme'), 'click', () => applyTheme('dark'));`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Theme Customizer',
  layout: {
    type: 'grid',
    columns: 2
  },
  items: [{
    xtype: 'toolbar',
    colspan: 2,
    items: [{
      text: 'Light',
      handler: function() { applyTheme('light'); }
    }, {
      text: 'Dark',
      handler: function() { applyTheme('dark'); }
    }]
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Primary',
    itemId: 'primary'
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Success',
    itemId: 'success'
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Background',
    itemId: 'background'
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Error',
    itemId: 'error'
  }],
  renderTo: Ext.getBody()
});`,
    typescript: `import { ColorPicker, Card, BlockStack, Button, Label, InlineStack } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

interface Theme {
  primary: HSBColor;
  secondary: HSBColor;
  background: HSBColor;
  text: HSBColor;
  success: HSBColor;
  warning: HSBColor;
  error: HSBColor;
}

function ThemeCustomizer(): JSX.Element {
  const [theme, setTheme] = useState<Theme>({
    primary: { hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1 },
    secondary: { hue: 210, saturation: 0.5, brightness: 0.95, alpha: 1 },
    background: { hue: 0, saturation: 0, brightness: 1, alpha: 1 },
    text: { hue: 0, saturation: 0, brightness: 0.2, alpha: 1 },
    success: { hue: 120, saturation: 0.7, brightness: 0.9, alpha: 1 },
    warning: { hue: 45, saturation: 1, brightness: 0.9, alpha: 1 },
    error: { hue: 0, saturation: 0.8, brightness: 0.9, alpha: 1 },
  });

  return (
    <Card>
      <BlockStack gap="400">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <BlockStack gap="300">
            <div>
              <Label>Primary</Label>
              <ColorPicker
                onChange={(color) => setTheme(prev => ({ ...prev, primary: color }))}
                color={theme.primary}
              />
            </div>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default ThemeCustomizer;`
  },

  brandcolorselector: {
    react: `import { ColorPicker, Card, Button } from '@shopify/polaris';
import { useState } from 'react';

function BrandColorSelector() {
  const [selectedColor, setSelectedColor] = useState({
    hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [savedColors, setSavedColors] = useState([]);

  const brandColors = [
    { name: 'Corporate Blue', color: { hue: 210, saturation: 0.8, brightness: 0.9, alpha: 1 } },
    { name: 'Accent Red', color: { hue: 0, saturation: 0.9, brightness: 0.8, alpha: 1 } },
    { name: 'Nature Green', color: { hue: 140, saturation: 0.7, brightness: 0.6, alpha: 1 } },
  ];

  const saveColor = () => {
    setSavedColors(prev => [...prev, { name: \`Color \${prev.length + 1}\`, color: selectedColor }]);
  };

  return (
    <Card>
      <div>
        <h3>Brand Color Selector</h3>
        <div>
          {brandColors.map((brandColor, index) => (
            <button key={index} onClick={() => setSelectedColor(brandColor.color)}>
              {brandColor.name}
            </button>
          ))}
        </div>
        <ColorPicker onChange={setSelectedColor} color={selectedColor} />
        <Button onClick={saveColor}>Save Color</Button>
      </div>
    </Card>
  );
}

export default BrandColorSelector;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const brandColors = {
  corporate: '#3366CC',
  accent: '#FF3333',
  nature: '#66A366'
};

const savedColors = [];
const colorInput = $('#color-input');

function saveBrandColor() {
  const color = colorInput.value;
  savedColors.push({ name: \`Color \${savedColors.length + 1}\`, color });
  updateSavedColorsList();
  EventBus.emit('color:saved', { color });
}

function updateSavedColorsList() {
  const list = $('#saved-colors');
  list.innerHTML = savedColors.map(c =>
    \`<div class="saved-color" style="background:\${c.color}">\${c.name}</div>\`
  ).join('');
}

on($('#save-color-btn'), 'click', saveBrandColor);`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Brand Color Selector',
  layout: 'vbox',
  items: [{
    xtype: 'toolbar',
    items: [{
      text: 'Corporate Blue',
      handler: function() { selectBrandColor('#3366CC'); }
    }, {
      text: 'Accent Red',
      handler: function() { selectBrandColor('#FF3333'); }
    }]
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Selected Color',
    itemId: 'colorField'
  }, {
    xtype: 'button',
    text: 'Save Color',
    handler: function() {
      const color = this.up('panel').down('#colorField').getValue();
      saveBrandColor(color);
    }
  }, {
    xtype: 'dataview',
    itemId: 'savedColors',
    store: Ext.create('Ext.data.Store', {
      fields: ['name', 'color']
    })
  }],
  renderTo: Ext.getBody()
});`,
    typescript: `import { ColorPicker, Card, Button } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

interface SavedColor {
  name: string;
  color: HSBColor;
}

interface BrandColor {
  name: string;
  color: HSBColor;
}

function BrandColorSelector(): JSX.Element {
  const [selectedColor, setSelectedColor] = useState<HSBColor>({
    hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);

  const brandColors: BrandColor[] = [
    { name: 'Corporate Blue', color: { hue: 210, saturation: 0.8, brightness: 0.9, alpha: 1 } },
    { name: 'Accent Red', color: { hue: 0, saturation: 0.9, brightness: 0.8, alpha: 1 } },
    { name: 'Nature Green', color: { hue: 140, saturation: 0.7, brightness: 0.6, alpha: 1 } },
  ];

  const saveColor = (): void => {
    setSavedColors(prev => [...prev, { name: \`Color \${prev.length + 1}\`, color: selectedColor }]);
  };

  return (
    <Card>
      <div>
        <ColorPicker onChange={setSelectedColor} color={selectedColor} />
        <Button onClick={saveColor}>Save Color</Button>
      </div>
    </Card>
  );
}

export default BrandColorSelector;`
  },

  gradientcreator: {
    react: `import { ColorPicker, Card, BlockStack, Label, TextField } from '@shopify/polaris';
import { useState } from 'react';

function GradientCreator() {
  const [startColor, setStartColor] = useState({
    hue: 280, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [endColor, setEndColor] = useState({
    hue: 200, saturation: 0.7, brightness: 0.8, alpha: 1,
  });
  const [angle, setAngle] = useState(45);

  const gradientStyle = {
    background: \`linear-gradient(\${angle}deg,
      hsla(\${startColor.hue}, \${startColor.saturation * 100}%, \${startColor.brightness * 100}%, \${startColor.alpha}) 0%,
      hsla(\${endColor.hue}, \${endColor.saturation * 100}%, \${endColor.brightness * 100}%, \${endColor.alpha}) 100%)\`
  };

  return (
    <Card>
      <BlockStack gap="300">
        <div>
          <Label>Start Color</Label>
          <ColorPicker onChange={setStartColor} color={startColor} />
        </div>
        <div>
          <Label>End Color</Label>
          <ColorPicker onChange={setEndColor} color={endColor} />
        </div>
        <TextField
          label="Angle"
          type="number"
          value={angle.toString()}
          onChange={(value) => setAngle(parseInt(value) || 0)}
          suffix="°"
        />
        <div style={{ height: '120px', borderRadius: '8px', ...gradientStyle }} />
      </BlockStack>
    </Card>
  );
}

export default GradientCreator;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const startColorInput = $('#start-color');
const endColorInput = $('#end-color');
const angleInput = $('#angle');
const preview = $('#gradient-preview');

function updateGradient() {
  const startColor = startColorInput.value;
  const endColor = endColorInput.value;
  const angle = angleInput.value;

  preview.style.background = \`linear-gradient(\${angle}deg, \${startColor}, \${endColor})\`;
  EventBus.emit('gradient:updated', { startColor, endColor, angle });
}

on(startColorInput, 'input', updateGradient);
on(endColorInput, 'input', updateGradient);
on(angleInput, 'input', updateGradient);`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Gradient Creator',
  layout: 'vbox',
  items: [{
    xtype: 'colorfield',
    fieldLabel: 'Start Color',
    itemId: 'startColor',
    value: 'CC66CC',
    listeners: { change: updateGradient }
  }, {
    xtype: 'colorfield',
    fieldLabel: 'End Color',
    itemId: 'endColor',
    value: '6699CC',
    listeners: { change: updateGradient }
  }, {
    xtype: 'numberfield',
    fieldLabel: 'Angle',
    itemId: 'angle',
    value: 45,
    minValue: 0,
    maxValue: 360,
    listeners: { change: updateGradient }
  }, {
    xtype: 'component',
    itemId: 'preview',
    height: 120,
    style: 'border-radius: 8px;'
  }],
  renderTo: Ext.getBody()
});

function updateGradient() {
  // Gradient update logic
}`,
    typescript: `import { ColorPicker, Card, BlockStack, Label, TextField } from '@shopify/polaris';
import { useState } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

function GradientCreator(): JSX.Element {
  const [startColor, setStartColor] = useState<HSBColor>({
    hue: 280, saturation: 0.8, brightness: 0.9, alpha: 1,
  });
  const [endColor, setEndColor] = useState<HSBColor>({
    hue: 200, saturation: 0.7, brightness: 0.8, alpha: 1,
  });
  const [angle, setAngle] = useState<number>(45);

  const gradientStyle = {
    background: \`linear-gradient(\${angle}deg,
      hsla(\${startColor.hue}, \${startColor.saturation * 100}%, \${startColor.brightness * 100}%, \${startColor.alpha}) 0%,
      hsla(\${endColor.hue}, \${endColor.saturation * 100}%, \${endColor.brightness * 100}%, \${endColor.alpha}) 100%)\`
  };

  return (
    <Card>
      <BlockStack gap="300">
        <div>
          <Label>Start Color</Label>
          <ColorPicker onChange={setStartColor} color={startColor} />
        </div>
        <div>
          <Label>End Color</Label>
          <ColorPicker onChange={setEndColor} color={endColor} />
        </div>
        <TextField
          label="Angle"
          type="number"
          value={angle.toString()}
          onChange={(value) => setAngle(parseInt(value) || 0)}
          suffix="°"
          autoComplete="off"
        />
        <div style={{ height: '120px', borderRadius: '8px', ...gradientStyle }} />
      </BlockStack>
    </Card>
  );
}

export default GradientCreator;`
  },

  colorpickerinpopover: {
    react: `import { ColorPicker, Popover, Button } from '@shopify/polaris';
import { useState } from 'react';

function ColorPickerInPopover() {
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1,
  });

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Choose Color
    </Button>
  );

  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <div style={{ padding: '16px' }}>
          <ColorPicker onChange={setSelectedColor} color={selectedColor} />
        </div>
      </Popover>
      <div style={{ marginTop: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: \`hsla(\${selectedColor.hue}, \${selectedColor.saturation * 100}%, \${selectedColor.brightness * 100}%, \${selectedColor.alpha})\`,
        }} />
      </div>
    </div>
  );
}

export default ColorPickerInPopover;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const colorButton = $('#color-button');
const colorPopover = $('#color-popover');
const colorInput = $('#color-input');
const preview = $('#color-preview');

let popoverVisible = false;

on(colorButton, 'click', () => {
  popoverVisible = !popoverVisible;
  colorPopover.style.display = popoverVisible ? 'block' : 'none';
});

on(colorInput, 'input', (e) => {
  const color = e.target.value;
  preview.style.backgroundColor = color;
  EventBus.emit('color:selected', { hex: color });
});

// Close popover when clicking outside
on(document, 'click', (e) => {
  if (!colorButton.contains(e.target) && !colorPopover.contains(e.target)) {
    popoverVisible = false;
    colorPopover.style.display = 'none';
  }
});`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Choose Color',
  menu: {
    items: [{
      xtype: 'colorpicker',
      value: '3399FF',
      listeners: {
        select: function(picker, color) {
          updatePreview('#' + color);
          this.up('menu').hide();
          EventBus.emit('color:selected', { hex: '#' + color });
        }
      }
    }]
  },
  renderTo: Ext.getBody()
});

Ext.create('Ext.Component', {
  itemId: 'colorPreview',
  width: 40,
  height: 40,
  style: 'border-radius: 4px; background-color: #3399FF; margin-top: 16px;',
  renderTo: Ext.getBody()
});

function updatePreview(color) {
  Ext.ComponentQuery.query('#colorPreview')[0].setStyle('background-color', color);
}`,
    typescript: `import { ColorPicker, Popover, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
}

function ColorPickerInPopover(): JSX.Element {
  const [popoverActive, setPopoverActive] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<HSBColor>({
    hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1,
  });

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((active) => !active);
  }, []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Choose Color
    </Button>
  );

  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <div style={{ padding: '16px' }}>
          <ColorPicker onChange={setSelectedColor} color={selectedColor} />
        </div>
      </Popover>
      <div style={{ marginTop: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: \`hsla(\${selectedColor.hue}, \${selectedColor.saturation * 100}%, \${selectedColor.brightness * 100}%, \${selectedColor.alpha})\`,
          border: '1px solid #e1e3e5'
        }} />
      </div>
    </div>
  );
}

export default ColorPickerInPopover;`
  }
};
