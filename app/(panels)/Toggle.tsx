"use client";

export default function Toggle({
  panel,
  onClick,
}: {
  panel: string;
  onClick: (panel: string) => void;
}) {
  return (
    <div className="panel-toggle" onClick={() => onClick(panel)}>
      {panel}
    </div>
  );
}
