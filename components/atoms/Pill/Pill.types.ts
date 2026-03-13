export type TPill = {
    /**
     * The content to be displayed inside the pill.
     */
    children: React.ReactNode;
    /**
     * The visual style of the pill.
     */
    variant?: "default" | "favorite";
    /**
     * An optional icon to be displayed alongside the content.
     */
    icon?: React.ReactNode;
    /**
     * Additional CSS classes to customize the appearance of the pill.
     */
    className?: string;
};