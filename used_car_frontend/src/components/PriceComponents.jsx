import React from "react";

export default function PriceComponents({ components = [], setComponents }) {

    const update = (index, field, value) => {
        const updated = [...components];
        updated[index][field] = value;
        setComponents(updated);
    };

    const add = () => {
        setComponents([
            ...components,
            { name: "", amount: "", percentage: null, percentageBased: false, type: "ADDITION" }
        ]);
    };

    const remove = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    return (
        <div className="col-span-3 mt-4">

            <h3 className="font-semibold mb-2">Price Components</h3>

            {components.map((pc, i) => (
                <div key={i} className="grid grid-cols-6 gap-2 mb-2">

                    <input
                        placeholder="Name"
                        className="border p-2"
                        value={pc.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                    />

                    <select
                        className="border p-2"
                        value={pc.percentageBased ? "PERCENT" : "AMOUNT"}
                        onChange={(e) => {
                            const updated = [...components];
                            const isPercent = e.target.value === "PERCENT";

                            updated[i].percentageBased = isPercent;

                            if (isPercent) {
                                updated[i].amount = null;
                            } else {
                                updated[i].percentage = null;
                            }

                            setComponents(updated);
                        }}
                    >
                        <option value="AMOUNT">Amount</option>
                        <option value="PERCENT">%</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Amount"
                        className={`border p-2 ${pc.percentageBased ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                        value={pc.amount || ""}
                        disabled={pc.percentageBased}
                        onChange={(e) => update(i, "amount", Number(e.target.value))}
                    />

                    <input
                        type="number"
                        placeholder="%"
                        className={`border p-2 ${!pc.percentageBased ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                        value={pc.percentage || ""}
                        disabled={!pc.percentageBased}
                        onChange={(e) => update(i, "percentage", Number(e.target.value))}
                    />

                    <select
                        className="border p-2"
                        value={pc.type}
                        onChange={(e) => update(i, "type", e.target.value)}
                    >
                        <option value="ADDITION">Addition</option>
                        <option value="DEDUCTION">Deduction</option>
                    </select>

                    <button
                        type="button"
                        className="bg-red-500 text-white rounded"
                        onClick={() => remove(i)}
                    >
                        Remove
                    </button>

                </div>
            ))}

            <button
                type="button"
                onClick={add}
                className="bg-blue-500 text-white px-3 py-1 rounded"
            >
                + Add Component
            </button>

        </div>
    );
}