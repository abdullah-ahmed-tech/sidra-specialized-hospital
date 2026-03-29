interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}