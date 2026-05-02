import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-garage-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Join WrenchTrack</h1>
          <p className="mt-1 text-sm text-garage-400">Start tracking your garage projects today</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "bg-wrench hover:bg-wrench-dark text-white",
              card: "bg-garage-900 border-garage-800",
              headerTitle: "text-white",
              headerSubtitle: "text-garage-400",
              socialButtonsBlockButton: "bg-garage-800 text-white border-garage-700",
              socialButtonsBlockButtonText: "text-white",
              formFieldLabel: "text-garage-300",
              formFieldInput: "bg-garage-900 border-garage-700 text-white",
              footerActionText: "text-garage-400",
              footerActionLink: "text-wrench-light",
            }
          }}
        />
      </div>
    </main>
  );
}
