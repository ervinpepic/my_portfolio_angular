export interface Certificate {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

export interface School {
  schoolName: string;
  certificates: Certificate[];
}
