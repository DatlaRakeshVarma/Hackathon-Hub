import { format, parseISO, isBefore, isAfter, differenceInDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { Hackathon } from '../types';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const calculateStatus = (startDate: string, endDate: string): 'upcoming' | 'ongoing' | 'completed' => {
  const now = new Date();
  const start = startOfDay(parseISO(startDate));
  const end = endOfDay(parseISO(endDate));

  if (isBefore(now, start)) {
    return 'upcoming';
  } else if (isAfter(now, end)) {
    return 'completed';
  } else {
    return 'ongoing';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'ongoing':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getDeadlineColor = (deadlineDate: string): string => {
  const now = new Date();
  const deadline = parseISO(deadlineDate);
  
  // If deadline has passed
  if (isBefore(deadline, now)) {
    return 'text-gray-500';
  }
  
  const daysRemaining = differenceInDays(deadline, now);
  
  if (daysRemaining <= 3) {
    return 'text-red-600 font-medium';
  } else if (daysRemaining <= 7) {
    return 'text-orange-500 font-medium';
  } else if (daysRemaining <= 14) {
    return 'text-yellow-600 font-medium';
  } else {
    return 'text-green-600 font-medium';
  }
};

export const filterHackathons = (
  hackathons: Hackathon[],
  state: string,
  district: string,
  college: string,
  status: string,
  tag: string,
  startDate: string,
  endDate: string
): Hackathon[] => {
  return hackathons.filter((hackathon) => {
    const stateMatch = state === 'All States' || hackathon.state === state;
    const districtMatch = district === 'All Districts' || hackathon.district === district;
    const collegeMatch = college === 'All Colleges' || hackathon.college === college;
    const currentStatus = calculateStatus(hackathon.startDate, hackathon.endDate);
    const statusMatch = status === 'All Statuses' || currentStatus === status.toLowerCase();
    const tagMatch = tag === 'All Tags' || hackathon.tags.includes(tag);

    // Date range filter
    let dateRangeMatch = true;
    if (startDate && endDate) {
      const filterStart = startOfDay(parseISO(startDate));
      const filterEnd = endOfDay(parseISO(endDate));
      const hackathonStart = parseISO(hackathon.startDate);
      const hackathonEnd = parseISO(hackathon.endDate);

      // Check if there's any overlap between the filter date range and the hackathon dates
      dateRangeMatch = isWithinInterval(hackathonStart, { start: filterStart, end: filterEnd }) ||
                      isWithinInterval(hackathonEnd, { start: filterStart, end: filterEnd }) ||
                      (isBefore(hackathonStart, filterStart) && isAfter(hackathonEnd, filterEnd));
    }

    return stateMatch && districtMatch && collegeMatch && statusMatch && tagMatch && dateRangeMatch;
  });
};