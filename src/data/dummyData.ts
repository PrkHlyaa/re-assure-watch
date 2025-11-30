export interface Comment {
  comment_id: string;
  author_display_name: string;
  author_channel_url: string;
  text_display: string;
  like_count: number;
  published_at: string;
  video_id: string;
  video_title: string;
  company_mentioned: string;
  sentiment_label: "positive" | "negative" | "neutral";
  sentiment_score_manual: number;
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

// YouTube Comments Data (Sample - 5 rows)
const youtubeCommentsRaw: Comment[] = [
  {
    comment_id: "Ugyy57ia602XJQZX0Dp4AaABAg",
    author_display_name: "@markusgunawans.t3922",
    author_channel_url: "http://www.youtube.com/@markusgunawans.t3922",
    text_display: "bole minta referensi asuransi yg preminya lebih hemat namun manfaatnya dapat tercukupi. sy baru terima email dari Allianz, ada kenaikan premi sebesar 27% (lumayan tinggi naiknya), heufff.. mohon pencerahannya, terima kasih.",
    like_count: 0,
    published_at: "2023-09-08T18:10:08Z",
    video_id: "mXWULYCR_Mk",
    video_title: "6 Jenis Asuransi Kesehatan Allianz Beserta Saran dan Rekomendasi",
    company_mentioned: "Allianz",
    sentiment_label: "negative",
    sentiment_score_manual: -0.6
  },
  {
    comment_id: "UgwTKxDBr3Cdi0a_hmp4AaABAg",
    author_display_name: "@yanarandhita367",
    author_channel_url: "http://www.youtube.com/@yanarandhita367",
    text_display: "Bapak kami ikut asuransi alianz sejak tahun 2017.dan bapak kami meninggal tgl 14 Oktober 2022,jatuh tempo pembayaran tgl 23 oktober 2022,sampai sekarang blm cair, dan masih disuruh bayar di bulan november 2022 ini. , persyaratan kami sudah lengkap, tetapi setelah diperiksa ada aja kekurangan. Padahal yg kasih persyaratan itu agent Allianz nya. Sudah mau hari ke 40 bapak kami meninggal blm cair. Tolong bantu jawab.",
    like_count: 2,
    published_at: "2022-11-22T17:16:29Z",
    video_id: "mXWULYCR_Mk",
    video_title: "6 Jenis Asuransi Kesehatan Allianz Beserta Saran dan Rekomendasi",
    company_mentioned: "Allianz",
    sentiment_label: "negative",
    sentiment_score_manual: -0.85
  },
  {
    comment_id: "UgzqJWf7gVNzOpRBZh14AaABAg",
    author_display_name: "@bahagialasaridarleida4630",
    author_channel_url: "http://www.youtube.com/@bahagialasaridarleida4630",
    text_display: "Saya jadi paham asuransi Allianz, makasih Bu Christine.",
    like_count: 0,
    published_at: "2022-10-02T17:08:56Z",
    video_id: "mXWULYCR_Mk",
    video_title: "6 Jenis Asuransi Kesehatan Allianz Beserta Saran dan Rekomendasi",
    company_mentioned: "Allianz",
    sentiment_label: "positive",
    sentiment_score_manual: 0.7
  },
  {
    comment_id: "Ugy8-7rvjHDBijX7sU54AaABAg",
    author_display_name: "@ciamelly9864",
    author_channel_url: "http://www.youtube.com/@ciamelly9864",
    text_display: "Mau tanya asuransi kesehatan itu ada kelas nya gak sih di Allianz",
    like_count: 0,
    published_at: "2022-07-25T11:39:33Z",
    video_id: "mXWULYCR_Mk",
    video_title: "6 Jenis Asuransi Kesehatan Allianz Beserta Saran dan Rekomendasi",
    company_mentioned: "Allianz",
    sentiment_label: "neutral",
    sentiment_score_manual: 0.0
  },
  {
    comment_id: "UgxuAWdpP_tHJ8LSTJ54AaABAg",
    author_display_name: "@Irnawati-mz7li",
    author_channel_url: "http://www.youtube.com/@Irnawati-mz7li",
    text_display: "Allianz keren, klaim di KPM Pagaralam sumses sepuluh tahun terakhir 14M, belum termasuk tahun ini 2025.we love Allianz.",
    like_count: 1,
    published_at: "2025-05-24T23:44:15Z",
    video_id: "Ks1mkjcMu0o",
    video_title: "10 ALASAN UTAMA KENAPA HARUS PILIH ALLIANZ",
    company_mentioned: "Allianz",
    sentiment_label: "positive",
    sentiment_score_manual: 0.9
  }
];

// Allianz Comments
export const allianzComments: Comment[] = youtubeCommentsRaw.filter(
  (comment) => comment.company_mentioned === "Allianz"
);

// Prudential Comments  
export const prudentialComments: Comment[] = youtubeCommentsRaw.filter(
  (comment) => comment.company_mentioned === "Prudential"
);

// Calculate Sentiment Summary from actual data
const calculateSentiment = (comments: Comment[]): SentimentData => {
  const total = comments.length;
  if (total === 0) return { positive: 0, negative: 0, neutral: 0 };
  
  const positive = comments.filter(c => c.sentiment_label === "positive").length;
  const negative = comments.filter(c => c.sentiment_label === "negative").length;
  const neutral = comments.filter(c => c.sentiment_label === "neutral").length;
  
  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
  };
};

export const allianzSentiment = calculateSentiment(allianzComments);
export const prudentialSentiment = calculateSentiment(prudentialComments);

// Generate Trend Data from comments by month
const generateTrendData = (): TrendData[] => {
  const months = [
    "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024",
    "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"
  ];
  
  return months.map((month) => {
    // Simple trend simulation based on available data
    const allianzAvg = allianzSentiment.positive - allianzSentiment.negative;
    const prudentialAvg = prudentialSentiment.positive - prudentialSentiment.negative;
    
    return {
      date: month,
      allianz: Math.max(0, Math.min(100, allianzAvg + (Math.random() * 10 - 5))),
      prudential: Math.max(0, Math.min(100, prudentialAvg + (Math.random() * 10 - 5))),
    };
  });
};

export const trendData = generateTrendData();
