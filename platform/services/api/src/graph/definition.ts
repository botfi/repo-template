export interface Context {
  headers: Record<string, string>
  /**
   * Authenticated sub
   */
  sub: string
}
