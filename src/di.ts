import vscode from 'vscode';

import { IConfiguration, VscodeWorkspaceConfiguration } from './configuration';
import { IStorage, GivenStorage, VscodeGlobalStorage } from './storage';


export interface ExtensionSettings {
  caseSensitiveStringSearch: boolean;
  caseSensitiveRegexSearch: boolean;
  preserveSearch: boolean;
  lineNumbers: boolean;
  createNewTab: boolean;
}

export interface SavedSearch {
  latestSearch: string;
}

export interface SavedContext {
  latestContext: string;
}

export interface IDependencyRegistry {

  readonly configuration: IConfiguration<ExtensionSettings>;
  readonly searchStorage: IStorage<SavedSearch>;
  readonly contextStorage: IStorage<SavedContext>;
}


export const DEFAULT_SETTINGS: Readonly<ExtensionSettings> = {
  caseSensitiveStringSearch: false,
  caseSensitiveRegexSearch: true,
  preserveSearch: true,
  lineNumbers: false,
  createNewTab: true,
};

export class DependencyRegistry implements IDependencyRegistry {
  private static SEARCH_STORAGE = new GivenStorage({ latestSearch: '' });

  // @override
  readonly configuration = new VscodeWorkspaceConfiguration(vscode.workspace.getConfiguration('filterlines'), DEFAULT_SETTINGS);

  // @override
  readonly searchStorage = DependencyRegistry.SEARCH_STORAGE;

  // @override
  readonly contextStorage: IStorage<SavedContext>;

  constructor(context: vscode.ExtensionContext) {
    this.contextStorage = new VscodeGlobalStorage(context.globalState, { latestContext: '' });
  }
}
