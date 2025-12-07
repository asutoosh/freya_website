// Calculate member count based on days since launch
// Starts at 98 and adds 6-10 random members per day

const LAUNCH_DATE = new Date("2025-12-01"); // Set your actual launch date
const BASE_MEMBERS = 98;
const MIN_DAILY_GROWTH = 6;
const MAX_DAILY_GROWTH = 10;

export function getMemberCount(): number {
  const now = new Date();
  const daysSinceLaunch = Math.floor(
    (now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Use date as seed for consistent random number per day
  const dateString = now.toISOString().split("T")[0];
  const seed = dateString.split("-").reduce((acc, val) => acc + parseInt(val), 0);
  
  // Generate pseudo-random number between MIN and MAX based on seed
  const dailyGrowth = MIN_DAILY_GROWTH + (seed % (MAX_DAILY_GROWTH - MIN_DAILY_GROWTH + 1));
  
  // Calculate total members
  const totalMembers = BASE_MEMBERS + (daysSinceLaunch * dailyGrowth);
  
  return Math.max(BASE_MEMBERS, totalMembers);
}
