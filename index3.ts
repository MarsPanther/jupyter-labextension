import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IMainMenu } from '@jupyterlab/mainmenu';
import { Menu } from '@lumino/widgets';

/**
 * Initialization data for the extra-links extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'extra-links',
  autoStart: true,
  requires: [IMainMenu],
  activate: (app: JupyterFrontEnd, mainMenu: IMainMenu) => {
    console.log('JupyterLab extension extra-links is activated!');

    const { commands } = app;
    const extraLinksMenu = new Menu({ commands });

    extraLinksMenu.title.label = 'Extra Links';
    mainMenu.addMenu(extraLinksMenu, { rank: 80 });

    // Define the URLs
    const urls = {
      'Google': 'https://www.google.com',
      'Facebook': 'https://www.facebook.com',
      'Twitter': 'https://www.twitter.com',
      'Yahoo': 'https://www.yahoo.com'
    };

    // Add commands and menu items for each URL
    Object.entries(urls).forEach(([name, url]) => {
      const command = `open-${name.toLowerCase()}`;

      commands.addCommand(command, {
        label: `Open ${name}`,
        isVisible: () => true,
        execute: () => window.open(url, '_blank')
      });

      extraLinksMenu.addItem({ command });
    });
  }
};

export default extension;



// menu-options.ts
import { JupyterFrontEnd } from '@jupyterlab/application';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { Menu } from '@lumino/widgets';

export function createExtraLinksMenu(app: JupyterFrontEnd, mainMenu: IMainMenu): void {
  const { commands } = app;
  const extraLinksMenu = new Menu({ commands });

  extraLinksMenu.title.label = 'Extra Links';
  mainMenu.addMenu(extraLinksMenu, { rank: 80 });

  // Define the URLs
  const urls = {
    'Google': 'https://www.google.com',
    'Facebook': 'https://www.facebook.com',
    'Twitter': 'https://www.twitter.com',
    'Yahoo': 'https://www.yahoo.com'
  };

  // Add commands and menu items for each URL
  Object.entries(urls).forEach(([name, url]) => {
    const command = `open-${name.toLowerCase()}`;

    commands.addCommand(command, {
      label: `Open ${name}`,
      isVisible: () => true,
      execute: () => window.open(url, '_blank')
    });

    extraLinksMenu.addItem({ command });
  });
}


// index.ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IMainMenu } from '@jupyterlab/mainmenu';
import { createExtraLinksMenu } from './menu-options';

/**
 * Initialization data for the extra-links extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'extra-links',
  autoStart: true,
  requires: [IMainMenu],
  activate: (app: JupyterFrontEnd, mainMenu: IMainMenu) => {
    console.log('JupyterLab extension extra-links is activated!');
    createExtraLinksMenu(app, mainMenu);
  }
};

export default extension;

