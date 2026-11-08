export default function formatPrice(cents: number) {
    if(cents === 0) return "Free";
    return ("$" + ((cents/100).toFixed(2)))
}