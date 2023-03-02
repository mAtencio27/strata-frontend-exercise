export interface UserDetails {
  username: string;
  profileImage: string;
  score: number;
}

export type LeaderboardData = {
  leaderboard: UserDetails[];
};

export type ProfileData = {
  username: string;
  bio: string;
  age: number;
  twitter: string;
  email: string;
  birthday: string;
};
