// src/menu-options.ts

import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';

export const websiteLinks = [
  { label: 'Google', url: 'https://www.google.com' },
  { label: 'Facebook', url: 'https://www.facebook.com' },
  { label: 'Twitter', url: 'https://www.twitter.com' }
];

export function addMenuOptions(app: JupyterFrontEnd, palette: ICommandPalette): void {
  const { commands } = app;

  websiteLinks.forEach(link => {
    // Use template literal to format command ID
    const commandId = `open-${link.label.toLowerCase().replace(' ', '-')}`;
    commands.addCommand(commandId, {
      label: `Open ${link.label}`,
      execute: () => {
        window.open(link.url, '_blank');
      }
    });
    palette.addItem({ command: commandId, category: 'TDS' });
  });
}


{
  "jupyter.lab.menus": {
    "main": [
      {
        "id": "jp-mainmenu-tds-menu",
        "label": "TDS",
        "rank": 90,
        "items": [
          // Items will be dynamically added by the extension code
        ]
      }
    ]
  }
}



// src/menu-options.ts

import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';

export const websiteLinks = [
  { label: 'Google', url: 'https://www.google.com' },
  { label: 'Facebook', url: 'https://www.facebook.com' },
  { label: 'Twitter', url: 'https://www.twitter.com' }
];

export function addMenuOptions(app: JupyterFrontEnd, palette: ICommandPalette): void {
  const { commands } = app;

  websiteLinks.forEach(link => {
    const command = `jlab-examples:open-${link.label}`;
    commands.addCommand(command, {
      label: `Open ${link.label}`,
      execute: () => {
        window.open(link.url, '_blank');
      }
    });
    palette.addItem({ command, category: 'TDS' });
  });
}
