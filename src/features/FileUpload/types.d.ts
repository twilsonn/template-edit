declare interface IFile {
  name: string;
  content: string;
  type: string;
  lastModified: number;
}

declare interface IFiles {
  [name: string]: IFile;
}
