import React from 'react';

interface PortalResultsProps {
    showMap: boolean;
}

export default function PortalResults({ showMap }: PortalResultsProps) {
    return (
        <div className="flex flex-1 flex-col gap-5 lg:flex-row">
            {/* Search Results */}
            <div className="flex-1 rounded bg-gray-100 p-5">
                <div className="mb-3 border-b border-gray-800 pb-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">Showing 0 results</div>
                        <div className="space-x-2">{/* Pagination would go here */}</div>
                    </div>
                </div>
                <div className="min-h-[400px]">
                    <p className="text-gray-600">Search results will be displayed here...</p>
                    {/* Search results would be rendered here */}
                </div>
            </div>

            {/* Map */}
            {showMap && (
                <div className="rounded bg-gray-100 p-5 lg:w-[620px]">
                    <div className="flex h-[330px] w-full items-center justify-center rounded bg-gray-200">
                        <p className="text-gray-600">Map will be displayed here</p>
                        {/* Leaflet map would be rendered here */}
                    </div>
                </div>
            )}
        </div>
    );
}
