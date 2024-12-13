export default function formatSentimentLabel(label: number): string {
  if (label === 1) return 'Positif';
  if (label === 0) return 'Netral';
  if (label === -1) return 'Negatif';
  return 'Tidak Diketahui';
}
