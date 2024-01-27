export function formatDateTime(inputTime) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = new Date(inputTime).toLocaleString('en-US', options);
  
  return formattedDate;
}