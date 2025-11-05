export interface ColumnConfig {
  key   : string;
  header: string;
  type? : 'text' | 'date' | 'booleanBadge' | 'link' | 'image';
}