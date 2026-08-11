import { PieChart } from "lucide-react";

import { useState, useEffect, use } from "react";
import DoughnutChart from "../charts/DoughnutChart";

export default function UserDistributionCard({ data }) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    User Distribution
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Breakdown of users by role.
                </p>
            </div>

            <div className="mt-4">
                <DoughnutChart data={data} />
            </div>

        </div>
    );
}