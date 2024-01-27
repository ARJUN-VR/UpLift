import React from "react";

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>



export interface Campaign {
    _id: string;
    title: string;
    tagline: string;
    category: string;
    story: string;
    image: string;
    target: number;
    duration: string;
    location: string;
    userEmail: string;
  }
  