import Link from "next/link";
import Header from "@/components/Header";
import { CheckCircleIcon } from "@/components/icons";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">
          <CheckCircleIcon className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
          Listing submitted!
        </h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Thank you for sharing your property details. Our top Noida brokers
          will review your listing and reach out to you directly on your
          phone number.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-card"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
