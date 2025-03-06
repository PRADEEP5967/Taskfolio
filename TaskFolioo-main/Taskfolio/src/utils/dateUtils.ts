
import { format, isBefore, isToday, isTomorrow, addDays, parseISO } from 'date-fns';

// Format a date string into a human-readable format
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

// Check if a date is overdue (in the past and not completed)
export const isOverdue = (dateString: string | null, status: string): boolean => {
  if (!dateString || status === 'completed') return false;
  
  const date = parseISO(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return isBefore(date, today);
};

// Format a date string for input fields
export const formatDateForInput = (dateString: string | null): string => {
  if (!dateString) return '';
  return format(parseISO(dateString), 'yyyy-MM-dd');
};

// Get a relative time description
export const getRelativeTimeDescription = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = parseISO(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isToday(date)) {
    return 'Due today';
  } else if (isTomorrow(date)) {
    return 'Due tomorrow';
  } else if (isBefore(date, today)) {
    return 'Overdue';
  } else if (isBefore(date, addDays(today, 7))) {
    return `Due ${format(date, 'EEEE')}`;
  } else {
    return `Due ${format(date, 'MMM d, yyyy')}`;
  }
};
