import { Button } from "@/components/ui/button";
import { Wrench, Camera, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-garage-950 via-garage-900 to-garage-950 text-white">
      {/* Hero */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-wrench/20 px-4 py-2 text-sm font-medium text-wrench-light ring-1 ring-wrench/30">
            <Wrench className="h-4 w-4" />
            The garage warrior&apos;s OS
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Track every bolt.
            <br />
            <span className="text-wrench">Every dollar.</span>
            <br />
            Every flip.
          </h1>
          <p className="mb-8 text-lg text-garage-300 md:text-xl">
            WrenchTrack is the project-management operating system for DIY
            mechanics, restoration hobbyists, and fix-and-flip side hustles.
            Works offline in your garage. No app store gatekeeping.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-wrench hover:bg-wrench-dark text-white gap-2 garage-touch"
              >
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="border-garage-600 text-garage-200 hover:bg-garage-800 garage-touch"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Built for the garage, not the boardroom
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Camera className="h-6 w-6" />}
              title="Photo Documentation"
              description="Capture every disassembly step with photos and notes. Never forget how it goes back together."
            />
            <FeatureCard
              icon={<DollarSign className="h-6 w-6" />}
              title="Profit Tracking"
              description="Know if your flip actually made money. Buy price + parts + labor = real P&L."
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="AI Valuations"
              description="Get real-time estimates based on marketplace comps. Know what to pay and what to sell for."
            />
            <FeatureCard
              icon={<Wrench className="h-6 w-6" />}
              title="Parts Inventory"
              description="Track every part, every vendor, every receipt. Cross-project spare parts garage."
            />
            <FeatureCard
              icon={<ArrowRight className="h-6 w-6" />}
              title="Offline First"
              description="Works in your garage where WiFi is spotty. Syncs when you&apos;re back online."
            />
            <FeatureCard
              icon={<Wrench className="h-6 w-6" />}
              title="Shareable Builds"
              description="Generate slick build cards and PDF reports for buyers, forums, or Instagram."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-garage-800/50 p-8 text-center ring-1 ring-garage-700">
          <h3 className="mb-4 text-2xl font-bold">Ready to get organized?</h3>
          <p className="mb-6 text-garage-300">
            Free for 2 projects. Upgrade when you&apos;re ready to scale your
            garage hustle.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-wrench hover:bg-wrench-dark text-white gap-2 garage-touch"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-sm text-garage-500">
        <p>© 2026 WrenchTrack. Built by garage warriors, for garage warriors.</p>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-garage-800/40 p-6 ring-1 ring-garage-700/50 backdrop-blur-sm">
      <div className="mb-4 inline-flex rounded-lg bg-wrench/20 p-3 text-wrench-light">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-garage-400">{description}</p>
    </div>
  );
}