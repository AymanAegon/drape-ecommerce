export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Drape Inc. All rights reserved.</p>
        <p className="mt-1">Modern Styles, Delivered.</p>
      </div>
    </footer>
  );
}
