export default function convertAbbreviation(input: string): string {
  const abbreviationMap: { [key: string]: string } = {
    KM: 'Kuliner & Makanan',
    FT: 'Fashion & Tekstil',
    A: 'Agribisnis',
    KT: 'Kerajinan Tangan',
    TD: 'Teknologi Digital',
    KK: 'Kesehatan & Kecantikan',
    PP: 'Pendidikan & Pelatihan',
    OT: 'Otomotif & Transportasi',
    PU: 'Perdagangan Umum',
    P: 'Pariwisata',
  };

  return abbreviationMap[input] || input;
}
