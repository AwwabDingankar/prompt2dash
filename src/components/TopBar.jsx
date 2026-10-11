/** TopBar — Minimal nav: logo + links + CTA */
import Icon from './Icon';

export default function TopBar() {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="max-w-[1120px] mx-auto px-8 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Icon i="bar-chart-3" size={18} color="#ffffff" />
          </div>
          <span className="font-headings text-base font-semibold text-foreground tracking-tight">
            Prompt2Dash
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Product</a>
            <a href="#" className="hover:text-foreground transition-colors">Examples</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Sign in
            </a>
            <button className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
