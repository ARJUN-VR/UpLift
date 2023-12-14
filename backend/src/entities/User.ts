export interface userInterface {
  name: string;
  email: string;
  password: string;
  credentials?: string;
  matchPassword?(enteredPassword: string): Promise<boolean>;
}
