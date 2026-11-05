import Link from "next/link";

export function GraveMessage({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto mt-10 max-w-md text-center">
      <p className="font-serif text-3xl text-pale">{title}</p>
      <p className="mt-3 text-sm text-stone">{message}</p>
      <Link
        href="/"
        className="mt-8 inline-block border border-pale/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-pale hover:border-amber hover:text-amber"
      >
        Try another grave
      </Link>
    </div>
  );
}
