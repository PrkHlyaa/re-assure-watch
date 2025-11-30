import { useState } from "react";
import { Comment } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, Youtube } from "lucide-react";

interface CommentTableProps {
  comments: Comment[];
}

const CommentTable = ({ comments }: CommentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredComments = comments.filter(
    (comment) =>
      comment.text_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author_display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.video_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = filteredComments.slice(startIndex, startIndex + itemsPerPage);

  const getSentimentBadge = (sentiment: Comment["sentiment_label"]) => {
    const variants = {
      positive: "default",
      negative: "destructive",
      neutral: "secondary",
    } as const;

    const labels = {
      positive: "Positif",
      negative: "Negatif",
      neutral: "Netral",
    };

    return (
      <Badge variant={variants[sentiment]} className="capitalize">
        {labels[sentiment]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan komentar, username, atau judul video..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Tanggal</TableHead>
              <TableHead className="w-[150px]">Username</TableHead>
              <TableHead className="w-[120px]">Sentimen</TableHead>
              <TableHead>Komentar</TableHead>
              <TableHead className="w-[250px]">Judul Video</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedComments.length > 0 ? (
              paginatedComments.map((comment) => (
                <TableRow key={comment.comment_id}>
                  <TableCell className="font-medium text-sm">
                    {new Date(comment.published_at).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {comment.author_display_name}
                  </TableCell>
                  <TableCell>{getSentimentBadge(comment.sentiment_label)}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2">{comment.text_display}</p>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://www.youtube.com/watch?v=${comment.video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 hover:underline"
                    >
                      <Youtube className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-2">{comment.video_title}</span>
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Tidak ada komentar ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredComments.length)} of{" "}
            {filteredComments.length} comments
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-9"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentTable;
