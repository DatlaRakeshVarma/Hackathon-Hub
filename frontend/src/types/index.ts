export interface Hackathon {
  _id: string;
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
  imageFile?: File; 
  status: 'pending' | 'upcoming' | 'ongoing' | 'completed' | 'rejected';
  isVerified: boolean;
}

export interface HackathonSubmission extends Omit<Hackathon, '_id' | 'isVerified' | 'status'> {
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