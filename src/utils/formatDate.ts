export default function formatDate(iso: string) {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
}