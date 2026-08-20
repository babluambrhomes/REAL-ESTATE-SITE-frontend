export interface VideoCardProps {
  image: string;
  title: string;
  location: string;
  duration?: string;
  videoId?: string;
}

export interface HappyClientCardProps {
  image: string;
  name: string;
  role: string;
  rating: number;
  review: string;
}

export interface BlogCardProps {
  image: string;
  date: string;
  title: string;
}

export interface AgentCardProps {
  image: string;
  name: string;
  designation: string;
  followers: number;
  views: number;
  videos: number;
}

export interface Chip {
  title: string;
  subtitle: string;
  image: string;
  color: string;
  lightColor: string;
}
