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
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {badge ? <PublicBadge>{badge}</PublicBadge> : null}

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}