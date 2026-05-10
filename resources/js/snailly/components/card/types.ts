import { ReactNode } from "react";

export interface CardProps {
    title: string
    size?: CardSize
    children: ReactNode
    icon: ReactNode
    variant?: CardContentVariant
}

export type CardContentVariant = "allContent" | "positive" | "negative";
export type CardSize = "small" | "medium" | "large" | "full";
