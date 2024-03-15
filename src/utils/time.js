export function timeSince(dateParam) {
  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000; // 365 days

  if (interval > 1) {
    return Math.floor(interval) + " year" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  interval = seconds / 2592000; // 30 days
  if (interval > 1) {
    return Math.floor(interval) + " month" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  interval = seconds / 604800; // 7 days
  if (interval > 1) {
    return Math.floor(interval) + " week" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  interval = seconds / 86400; // 24 hours
  if (interval > 1) {
    return Math.floor(interval) + " day" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  interval = seconds / 3600; // 60 minutes
  if (interval > 1) {
    return Math.floor(interval) + " hour" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minute" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
  }
  return Math.floor(seconds) + " second" + (Math.floor(seconds) > 1 ? "s" : "") + " ago";
}


export function convertTimeToDuration(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  let duration = '';

  if (hours > 0) {
    duration += hours === 1 ? '1 HOUR' : `${hours} HOURS`;
  }

  if (minutes > 0) {
    duration += duration.length > 0 ? ' ' : '';
    duration += minutes === 1 ? '1 MINUTE' : `${minutes} MINUTES`;
  }

  if (hours === 0 && minutes === 0 && seconds >= 0) {
    duration = 'LESS THAN A MINUTE';
  }

  return duration;
}


export function convertSecondsToDuration(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  let duration = '';

  if (hours > 0) {
    duration += hours === 1 ? '1 HOUR' : `${hours} HOURS`;
  }

  if (minutes > 0) {
    duration += duration.length > 0 ? ' ' : '';
    duration += minutes === 1 ? '1 MINUTE' : `${minutes} MINUTES`;
  }

  if (hours === 0 && minutes === 0 && seconds >= 0) {
    duration = 'LESS THAN A MINUTE';
  }

  return duration;
}

export function formatTime(hours, minutes) {
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const seconds = '00';

  return `${formattedHours}:${formattedMinutes}:${seconds}`;
}

export function calcMinutes(hours, minutes) {
  return hours * 60 + minutes;
}

export function trimTimestampAfterDot(timestamp) {
  return timestamp.split('.')[0];
}

// Test cases
// console.log(convertSecondsToDuration(900)); // Output: 15 MINUTES
// console.log(convertSecondsToDuration(3600)); // Output: 1 HOUR
// console.log(convertSecondsToDuration(5400)); // Output: 1 HOUR 30 MINUTES
// console.log(convertSecondsToDuration(90)); // Output: 1 MINUTE 30 SECONDS
// console.log(convertSecondsToDuration(30)); // Output: LESS THAN A MINUTE
// console.log(convertSecondsToDuration(-100)); // Output: Invalid input
// console.log(convertSecondsToDuration('abc')); // Output: Invalid input

// Test cases
// console.log(convertTimeToDuration('05:00:00')); // Output: 5 HOURS
// console.log(convertTimeToDuration('01:35:00')); // Output: 1 HOUR 35 MINUTES
// console.log(convertTimeToDuration('00:04:30')); // Output: 4 MINUTES
// console.log(convertTimeToDuration('00:00:45')); // Output: LESS THAN A MINUTE
