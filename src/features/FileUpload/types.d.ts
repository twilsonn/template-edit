declare interface IFile {
  name: string;
  content: string;
  type: string;
  html: string;
  size: number;
  updatedAt: number;
  createdAt: number;
}

declare interface IFiles {
  [name: string]: IFile;
}
