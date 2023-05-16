declare interface IFile {
  name: string;
  content: string;
  type: string;
  lastModified: number;
  html: string;
}

declare interface IFiles {
  [name: string]: IFile;
}
