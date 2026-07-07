import { CameraIcon, CheckCircleIcon, UsersIcon } from "./icons";

const steps = [
  {
    icon: CameraIcon,
    title: "Share your property",
    desc: "Fill a 1-minute form with your property & contact details. Photos are optional but help you sell faster.",
  },
  {
    icon: UsersIcon,
    title: "We match you with brokers",
    desc: "Your listing is shared with Noida's top 10 verified brokers who specialize in your sector.",
  },
  {
    icon: CheckCircleIcon,
    title: "Close the deal",
    desc: "Brokers reach out directly, arrange visits, and help you close — usually within 60 days*.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-bold text-slate-900">How it works</h2>
      <p className="mt-1 text-sm text-slate-500">
        Three simple steps to get your property in front of serious buyers.
      </p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-500">
                Step {i + 1}
              </p>
              <h3 className="text-sm font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
