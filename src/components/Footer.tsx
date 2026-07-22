const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

import Image from "next/image";

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
          <div className="flex items-center gap-5 text-muted-text">
            <a href="#" className="hover:text-primary transition-transform hover:-translate-y-1" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary transition-transform hover:-translate-y-1" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary transition-transform hover:-translate-y-1" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-4 text-muted-text text-sm">
            <li><a href="/#audit" className="hover:text-primary transition-colors">Under the Hood Audit</a></li>
            <li><a href="/services/google-profile" className="hover:text-primary transition-colors">Google Profile & Local Search</a></li>
            <li><a href="/services/website-builds" className="hover:text-primary transition-colors">Website Strategy & Builds</a></li>
            <li><a href="/services/lead-response" className="hover:text-primary transition-colors">Lead Response & Follow-Up</a></li>
            <li><a href="/insights" className="hover:text-primary transition-colors">Insights & Articles</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-muted-text">
            <li><a href="mailto:trevor@truepathdigital.com" className="hover:text-primary transition-colors">trevor@truepathdigital.com</a></li>
            <li>Missoula, Montana</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-muted-border text-sm text-muted-text flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} True Path Digital. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
