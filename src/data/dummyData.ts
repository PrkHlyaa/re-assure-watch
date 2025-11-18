export interface Comment {
  id: string;
  date: string;
  username: string;
  sentiment: "positive" | "negative" | "neutral";
  content: string;
  redditUrl: string;
}

export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
}

export interface TrendData {
  date: string;
  allianz: number;
  prudential: number;
}

// Generate dummy comments
const generateComments = (brand: string, count: number): Comment[] => {
  const positiveComments = [
    "Klaim mudah dan cepat, pelayanan memuaskan",
    "Premi terjangkau dengan benefit lengkap",
    "Customer service responsif banget",
    "Sudah pakai 5 tahun, sangat puas",
    "Proses klaim lancar tanpa ribet",
    "Investasi yang bagus untuk masa depan",
    "Agen profesional dan helpful",
    "Coveragenya lengkap, cocok untuk keluarga",
    "Aplikasi mobile user-friendly",
    "Recommended banget buat yang cari asuransi",
  ];

  const negativeComments = [
    "Proses klaim lama dan berbelit",
    "Customer service susah dihubungi",
    "Premi mahal, benefit kurang",
    "Banyak exclusion yang tidak dijelaskan",
    "Agen kurang informatif",
    "Klaim ditolak tanpa alasan jelas",
    "Sistem online sering error",
    "Biaya admin terlalu tinggi",
    "Proses perpanjangan ribet",
    "Tidak sesuai dengan yang dijanjikan",
  ];

  const neutralComments = [
    "Standar saja, tidak ada yang istimewa",
    "Sama seperti asuransi lainnya",
    "Perlu pertimbangan lebih lanjut",
    "Masih dalam masa tunggu klaim",
    "Baru pakai 3 bulan, belum bisa review",
    "Lumayan untuk proteksi dasar",
    "Harga kompetitif di kelasnya",
    "Perlu compare dengan produk lain",
    "Dokumentasi lengkap tapi ribet",
    "Fitur cukup memadai",
  ];

  const comments: Comment[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const sentimentRand = Math.random();
    let sentiment: "positive" | "negative" | "neutral";
    let content: string;

    if (sentimentRand < 0.45) {
      sentiment = "positive";
      content = positiveComments[Math.floor(Math.random() * positiveComments.length)];
    } else if (sentimentRand < 0.75) {
      sentiment = "negative";
      content = negativeComments[Math.floor(Math.random() * negativeComments.length)];
    } else {
      sentiment = "neutral";
      content = neutralComments[Math.floor(Math.random() * neutralComments.length)];
    }

    const daysAgo = Math.floor(Math.random() * 365);
    const commentDate = new Date(now);
    commentDate.setDate(commentDate.getDate() - daysAgo);

    comments.push({
      id: `${brand}-${i}`,
      date: commentDate.toISOString().split("T")[0],
      username: `u/redditor${Math.floor(Math.random() * 10000)}`,
      sentiment,
      content: `${content} ${brand === "allianz" ? "(Allianz)" : "(Prudential)"}`,
      redditUrl: `https://reddit.com/r/indonesia/comments/${Math.random().toString(36).substring(7)}`,
    });
  }

  return comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const allianzComments = generateComments("allianz", 120);
export const prudentialComments = generateComments("prudential", 115);

// Generate trend data for the last 12 months
export const generateTrendData = (): TrendData[] => {
  const data: TrendData[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    data.push({
      date: date.toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
      allianz: Math.floor(Math.random() * 30) + 40, // 40-70
      prudential: Math.floor(Math.random() * 30) + 35, // 35-65
    });
  }

  return data;
};

export const trendData = generateTrendData();

// Calculate sentiment metrics
const calculateSentiment = (comments: Comment[]): SentimentData => {
  const total = comments.length;
  const positive = comments.filter((c) => c.sentiment === "positive").length;
  const negative = comments.filter((c) => c.sentiment === "negative").length;
  const neutral = comments.filter((c) => c.sentiment === "neutral").length;

  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
  };
};

export const allianzSentiment = calculateSentiment(allianzComments);
export const prudentialSentiment = calculateSentiment(prudentialComments);
