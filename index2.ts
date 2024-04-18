import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import { Menu } from '@lumino/widgets';

// Define the website links
const websiteLinks = [
  { label: 'Google', url: 'https://www.google.com' },
  { label: 'Facebook', url: 'https://www.facebook.com' },
  { label: 'Twitter', url: 'https://www.twitter.com' }
];

// Function to open a URL in a new tab
function openURL(url: string) {
  window.open(url, '_blank');
}

// Function to create the "Extra Links" menu
function createExtraLinksMenu(): Menu {
  const menu = new Menu({ commands: {} });
  menu.title.label = 'Extra Links';

  websiteLinks.forEach(link => {
    menu.addItem({
      command: '',
      args: { url: link.url },
      label: link.label,
      handler: () => openURL(link.url)
    });
  });

  return menu;
}

// Activate the extension
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'extra-links',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    // Add the "Extra Links" menu to the main menu bar
    const extraLinksMenu = createExtraLinksMenu();
    app.shell.add(extraLinksMenu, 'menu');

    // Add commands to the command palette for each link
    websiteLinks.forEach(link => {
      palette.addItem({
        command: '',
        args: { url: link.url },
        category: 'Extra Links',
        label: link.label,
        execute: () => openURL(link.url)
      });
    });
  }
};

export default plugin;
