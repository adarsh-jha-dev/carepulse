import clsx from "clsx";
import Image from "next/image";
import React from "react";

type StatCardProps = {
  count: number;
  label: string;
  icon: string;
  type: "appointments" | "pending" | "cancelled";
};

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt="icon"
          height={32}
          width={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-bold ">{count}</h2>
        <p className="text-14-regular">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
