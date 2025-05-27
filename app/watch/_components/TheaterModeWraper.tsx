"use client";
import { usePlayer } from "@/hooks/useStores";
import React, { HTMLAttributes } from "react";
import "./theaterStyle.css";

interface IProps {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const TheaterModeWraper = ({ children, className }: IProps) => {
  const { theaterMode } = usePlayer();

  return (
    <div className={`${theaterMode ? "theater-mode" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default TheaterModeWraper;
