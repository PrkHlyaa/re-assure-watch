const Footer = () => {
  const today = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="w-full border-t border-border bg-muted/30 py-6 mt-12">
      <div className="container px-4 md:px-8">
        <p className="text-center text-sm text-muted-foreground">
          Data bersumber dari Reddit publik • Last updated: {today} • © 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
