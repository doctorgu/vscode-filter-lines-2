import { IConfiguration, GivenConfiguration } from '../../configuration';
import { ExtensionSettings, DEFAULT_SETTINGS, SavedSearch, SavedContext, IDependencyRegistry } from '../../di';
import { IStorage, GivenStorage } from '../../storage';

class TestDependencyRegistry implements IDependencyRegistry {

  private fakeSettings!: ExtensionSettings;

  // @override
  configuration!: IConfiguration<ExtensionSettings>;

  // @override
  searchStorage!: IStorage<SavedSearch>;

  // @override
  contextStorage!: IStorage<SavedContext>;

  constructor() {
    this.reset();
  }

  reset() {
    this.fakeSettings = { ...DEFAULT_SETTINGS };

    this.configuration = new GivenConfiguration(this.fakeSettings);
    this.searchStorage = new GivenStorage({ latestSearch: '' });
    this.contextStorage = new GivenStorage({ latestContext: '' });
  }

  /**
   * Updates the fake configuration.
   *
   * @example Update a configuration value:
   * ```typescript
   * updateConfiguration({ preserveSearch: true });
   * ```
   *
   * @example Clear a configuration value, effectively setting it to the default:
   * ```typescript
   * updateConfiguration({ preserveSearch: undefined });
   * ```
   *
   * Of course, you can update/clear multiple settings at once.
   */
  updateConfiguration(settings: Partial<{[K in keyof ExtensionSettings]: ExtensionSettings[K]|undefined}>): void {
    for (const _key in settings)
      if (settings.hasOwnProperty(_key)) {
        const key = _key as keyof ExtensionSettings;
        const value = settings[key];
        this.fakeSettings[key] = value !== undefined ? value : DEFAULT_SETTINGS[key];
      }
  }
}

export const REGISTRY = new TestDependencyRegistry();
