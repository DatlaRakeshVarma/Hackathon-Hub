export interface Hackathon {
  id: string;
  title: string;
  college: string;
  state: string;
  district: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  description: string;
  eligibility: string;
  prizes: string;
  teamSize: {
    min: number;
    max: number;
  };
  tags: string[];
  website?: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  isVerified: boolean;
}

export interface HackathonSubmission extends Omit<Hackathon, 'id' | 'isVerified' | 'status'> {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface FilterOptions {
  state: string;
  district: string;
  college: string;
  status: string;
  tag: string;
  startDate: string;
  endDate: string;
}