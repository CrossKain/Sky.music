export type TTrack = {
  id: number;
  author: string;
  name: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: null;
  track_file: string;
  stared_user?: TStaredUser[] | null;
  liked: boolean;
};

export type TStaredUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type TFilterName = "authors" | "genres" | "order";
