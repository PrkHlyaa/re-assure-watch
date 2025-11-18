import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import MetricCard from "@/components/MetricCard";
import CommentTable from "@/components/CommentTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allianzComments, allianzSentiment, trendData } from "@/data/dummyData";

const AllianzDetail = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const sentimentDistribution = [
    { name: "Positif", value: allianzSentiment.positive, color: "hsl(var(--chart-1))" },
    { name: "Negatif", value: allianzSentiment.negative, color: "hsl(var(--chart-2))" },
    { name: "Netral", value: allianzSentiment.neutral, color: "hsl(var(--chart-3))" },
  ];

  const allianzTrend = trendData.map(item => ({
    date: item.date,
    sentimen: item.allianz,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Analisis Sentimen Mendalam – Allianz
            </h1>
          </div>
        </div>

        <FilterBar onDateRangeChange={setDateRange} />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Mention"
            value={allianzComments.length}
            subtitle="total mentions"
            icon={<MessageSquare className="h-6 w-6" />}
          />
          <MetricCard
            title="Sentimen Positif"
            value={`${allianzSentiment.positive}%`}
            subtitle="dari total mention"
            icon={<ThumbsUp className="h-6 w-6" />}
            variant="success"
          />
          <MetricCard
            title="Sentimen Negatif"
            value={`${allianzSentiment.negative}%`}
            subtitle="dari total mention"
            icon={<ThumbsDown className="h-6 w-6" />}
            variant="destructive"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Sentimen Allianz</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Sentimen Allianz (12 Bulan)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={allianzTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sentimen" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3}
                    name="Allianz Sentiment"
                    dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Comments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Komentar Reddit</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentTable comments={allianzComments} />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AllianzDetail;
