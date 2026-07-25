import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-muted-border bg-surface-alt py-20 px-6 md:px-12 mt-auto">
      <div className="max-w-[1400px] mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/logo.png" alt="True Path Digital Logo" title="True Path Digital — Missoula, Montana" width={32} height={32} className="w-8 h-auto object-contain" />
            <h3 className="font-serif text-2xl font-medium tracking-tight">True Path Digital.</h3>
          </div>
          <p className="text-muted-text text-base leading-relaxed max-w-sm mb-8">
            Clearer marketing. Better websites. Fewer lost opportunities. Based in Missoula, Montana, serving owner-operated service businesses.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-4 text-muted-text text-sm">
            <li><Link href="/#audit" className="hover:text-primary transition-colors">Under the Hood Audit</Link></li>
            <li><Link href="/services/google-profile" className="hover:text-primary transition-colors">Google Profile & Local Search</Link></li>
            <li><Link href="/services/website-builds" className="hover:text-primary transition-colors">Website Strategy & Builds</Link></li>
            <li><Link href="/services/lead-response" className="hover:text-primary transition-colors">Lead Response & Follow-Up</Link></li>
            <li><Link href="/insights" className="hover:text-primary transition-colors">Insights & Articles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-muted-text">
            <li><a href="mailto:trevor@truepathdigital.com" className="hover:text-primary transition-colors">trevor@truepathdigital.com</a></li>
            <li><a href="tel:+14068806992" className="hover:text-primary transition-colors">(406) 880-6992</a></li>
            <li>Missoula, Montana</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-muted-border text-sm text-muted-text">
        <p>&copy; {new Date().getFullYear()} True Path Digital. All rights reserved.</p>
      </div>
    </footer>
  );
}
