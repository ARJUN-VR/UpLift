


export interface userInterface {
  _id:any;
  name: string;
  email: string;
  password: string;
  credentials?: string;
  matchPassword?(enteredPassword: string): Promise<boolean>;
}
