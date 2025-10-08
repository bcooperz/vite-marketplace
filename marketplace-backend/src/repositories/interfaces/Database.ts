// todo: update types

interface IDatabase {
  query(params: any): Promise<any>;
  checkDatabaseConnection(): Promise<boolean>;
  close(): Promise<void>;
  initialize(): void;
}

export type { IDatabase };
