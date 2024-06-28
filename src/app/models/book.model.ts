// book.model.ts


export interface BookResponse {
  works: Work[];
}

export interface Work {
  key: string;
  title: string;
  edition_count: number;
  cover_id?: number | null;
  authors: Author[];
  first_publish_year: number;
}

export interface Author {
  key: string;
  name: string;
  photos?: [number];
  birth_date: string;
  worksCount: number;
  topSubjects: [string]
}
export interface AuthorBookDetails {
  type: {
    key: string
  },
  author: {
    key: string
  }
}

export interface BookDetails {
title: string;
covers?: [number];
first_publish_date: string;
number_of_pages: number;
authors : AuthorBookDetails[]
}

export interface EditionResponse {
  entries: EditionEntrie[]
}

export interface EditionEntrie {
  number_of_pages: number
}
