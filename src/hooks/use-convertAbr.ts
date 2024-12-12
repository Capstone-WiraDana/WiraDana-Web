export default function convertAbbreviation(input: string): string {
  const abbreviationMap: { [key: string]: string } = {
    KM: 'Kuliner dan Makanan',
    FT: 'Fashion dan Tekstil',
    A: 'Agribisnis',
    KT: 'Kerajinan Tangan',
    TD: 'Teknologi Digital',
    KK: 'Kesehatan dan Kecantikan',
    PP: 'Pendidikan dan Pelatihan',
    OT: 'Otomotif dan Transportasi',
    PU: 'Perdagangan Umum',
    P: 'Pariwisata',
  };

  return abbreviationMap[input] || input;
}
