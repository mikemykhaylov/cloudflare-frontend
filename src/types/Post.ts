export type PostTypes = 'text' | 'poll' | 'image';

export type FormValues = {
  title: string;
  content: string;
  tag: string;
  username: string;
  pollOptions: {
    option: string;
    id: string;
  }[];
  image: File;
};

export type NewPost = {
  type: PostTypes;
  title: string;
  username: string;
  content?: string;
  tag?: string;
  poll?: {
    pollOptions: {
      option: string;
      id: string;
      votes: number;
    }[];
    totalVotes: number;
  };
  imageUrl?: string;
};

export type Post = NewPost & { date: string };
