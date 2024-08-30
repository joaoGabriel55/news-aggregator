export function Footer() {
  return (
    <footer className="bg-slate-200 border-t">
      <div className="container px-4 md:px-6 py-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} News Aggregator. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
