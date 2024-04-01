import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';

interface WebsiteLink {
  label: string;
  url: string;
}

/**
 * Initialization data for the main menu example.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/main-menu:plugin',
  description: 'Minimal JupyterLab example adding a menu.',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, mainMenu: IMainMenu) => {
    const { commands } = app;

    // Define your website links
    const websiteLinks: WebsiteLink[] = [
      { label: 'Google', url: 'https://www.google.com' },
      { label: 'Facebook', url: 'https://www.facebook.com' },
      { label: 'Twitter', url: 'https://www.twitter.com' }
    ];

    // Create commands and add them to the command palette
    websiteLinks.forEach((link) => {
      const commandId = `open-${link.label.toLowerCase()}`; // Dynamic command IDs
      commands.addCommand(commandId, {
        label: link.label,
        execute: () => {
          window.open(link.url, '_blank');
        }
      });

      // palette.addItem({ command: commandId, category: 'Extension Examples' });
      // Add items to the Help menu with rank 0
      mainMenu.helpMenu.addGroup([{ command: commandId }], 0);
    });
  }
};

export default extension;
