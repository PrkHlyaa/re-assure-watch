import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import MetricCard from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allianzComments, prudentialComments, allianzSentiment, prudentialSentiment, trendData } from "@/data/dummyData";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const comparisonData = [
    {
      category: "Positif",
      Allianz: allianzSentiment.positive,
      Prudential: prudentialSentiment.positive,
    },
    {
      category: "Negatif",
      Allianz: allianzSentiment.negative,
      Prudential: prudentialSentiment.negative,
    },
    {
      category: "Netral",
      Allianz: allianzSentiment.neutral,
      Prudential: prudentialSentiment.neutral,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Sentiment Analysis Allianz vs Prudential dari YouTube
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ringkasan opini publik terkini dari komentar YouTube Indonesia & Global
          </p>
        </div>

        <FilterBar onDateRangeChange={setDateRange} />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Mention Allianz"
            value={allianzComments.length}
            subtitle="mentions in selected period"
            icon={<MessageSquare className="h-6 w-6" />}
            variant="default"
          />
          <MetricCard
            title="Total Mention Prudential"
            value={prudentialComments.length}
            subtitle="mentions in selected period"
            icon={<MessageSquare className="h-6 w-6" />}
            variant="default"
          />
          <MetricCard
            title="Allianz Sentiment"
            value={`${allianzSentiment.positive}%`}
            subtitle={`Positif • ${allianzSentiment.negative}% Negatif`}
            icon={<ThumbsUp className="h-6 w-6" />}
            variant="success"
          />
          <MetricCard
            title="Prudential Sentiment"
            value={`${prudentialSentiment.positive}%`}
            subtitle={`Positif • ${prudentialSentiment.negative}% Negatif`}
            icon={<ThumbsUp className="h-6 w-6" />}
            variant="success"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Perbandingan Sentimen</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="Allianz" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Prudential" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Sentimen (12 Bulan)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
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
                    dataKey="allianz" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    name="Allianz"
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prudential" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    name="Prudential"
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/allianz">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Detail Allianz
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/prudential">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              Detail Prudential
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
