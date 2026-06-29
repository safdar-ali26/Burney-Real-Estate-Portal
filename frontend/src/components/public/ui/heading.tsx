import PublicBadge from "./badge";

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {badge ? <PublicBadge>{badge}</PublicBadge> : null}

      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 text-xs leading-6 text-white/55 md:text-sm">
          {description}
        </p>
      ) : null}
    </div>
  );
}