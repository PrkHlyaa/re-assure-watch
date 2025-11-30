import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
            <span className="text-xl font-bold text-accent-foreground">R</span>
          </div>
          <span className="text-xl font-bold text-foreground">Re'Assurance</span>
        </Link>
        <p className="text-sm text-muted-foreground hidden md:block">
          YouTube Sentiment Analysis – Allianz vs Prudential
        </p>
      </div>
    </header>
  );
};

export default Header;
