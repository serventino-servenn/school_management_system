export default function UserDistributionTooltip({
    active,
    payload
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0].payload;

    const role =
        item.role.charAt(0) +
        item.role.slice(1).toLowerCase();

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">

            <p className="font-semibold text-slate-900">
                {role}
            </p>

            <p className="mt-1 text-sm text-slate-600">
                Users

                <span className="ml-2 font-bold text-slate-900">
                    {item.count.toLocaleString()}
                </span>
            </p>

        </div>
    );
}