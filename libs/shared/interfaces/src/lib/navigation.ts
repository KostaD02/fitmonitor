export interface Navigation {
  title: string;
  icon: string;
  routerLink: string;

  /**
   * Indicates if the item should be shown after authentication.
   * @default true
   */
  showAfterAuth?: boolean;

  /**
   * Indicates if the item should be shown before authentication.
   * @default true
   */
  showBeforeAuth?: boolean;

  /**
   * Indicates if the item should be shown before authentication.
   * @default false
   */
  adminOnly?: boolean;
}
