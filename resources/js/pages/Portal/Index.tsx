import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface PortalIndexProps {
    title: string;
}

interface SpatialFilter {
    north: string;
    south: string;
    east: string;
    west: string;
}

export default function PortalIndex({ title }: PortalIndexProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [spatialFilter, setSpatialFilter] = useState<SpatialFilter>({
        north: '',
        south: '',
        east: '',
        west: '',
    });
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [showMap, setShowMap] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier würde die Suchlogik implementiert werden
        console.log('Searching for:', searchQuery);
    };

    const handleSpatialChange = (field: keyof SpatialFilter, value: string) => {
        setSpatialFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const removeFilter = (filter: string) => {
        setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
        setSearchQuery('');
        setSpatialFilter({
            north: '',
            south: '',
            east: '',
            west: '',
        });
    };

    // Beispiel-Daten für Tags (später durch echte Daten ersetzen)
    const datacenters = ['GFZ German Research Centre', 'PANGAEA', 'Other Centers'];
    const categories = ['Geophysics', 'Seismology', 'Climate', 'Geology'];
    const resourceTypes = ['Dataset', 'Collection', 'Software', 'Model'];
    const subjects = ['Earth Science', 'Environmental Science', 'Atmosphere'];

    return (
        <>
            <Head title={title} />

            {/* Main Content */}
            <div className="mx-auto my-6 max-w-6xl">
                <div className="rounded-2xl bg-white p-5 shadow-lg">
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Left Sidebar */}
                        <div className="space-y-5 lg:w-[300px]">
                            {/* Search */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Search</h2>
                                <span className="text-xs text-gray-600">(press ESC to close suggestions)</span>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch(e);
                                            }
                                        }}
                                        placeholder="Enter search terms..."
                                    />
                                </div>
                            </div>

                            {/* Spatial Filter */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">
                                    Spatial Filter
                                    <button
                                        onClick={() => setShowMap(!showMap)}
                                        className="ml-16 rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                                    >
                                        Open Map
                                    </button>
                                </h2>
                                <div className="mt-3">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td className="px-1 text-center">
                                                    <input
                                                        type="text"
                                                        placeholder="North"
                                                        value={spatialFilter.north}
                                                        onChange={(e) => handleSpatialChange('north', e.target.value)}
                                                        className="w-[71px] rounded border border-gray-300 px-2 py-1 text-sm"
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="pr-1">
                                                    <input
                                                        type="text"
                                                        placeholder="West"
                                                        value={spatialFilter.west}
                                                        onChange={(e) => handleSpatialChange('west', e.target.value)}
                                                        className="w-[71px] rounded border border-gray-300 px-2 py-1 text-sm"
                                                    />
                                                </td>
                                                <td className="px-1 text-center">
                                                    <button className="h-[30px] w-[30px] rounded bg-gray-200 hover:bg-gray-300">🎯</button>
                                                </td>
                                                <td className="pl-1">
                                                    <input
                                                        type="text"
                                                        placeholder="East"
                                                        value={spatialFilter.east}
                                                        onChange={(e) => handleSpatialChange('east', e.target.value)}
                                                        className="w-[71px] rounded border border-gray-300 px-2 py-1 text-sm"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="px-1 text-center">
                                                    <input
                                                        type="text"
                                                        placeholder="South"
                                                        value={spatialFilter.south}
                                                        onChange={(e) => handleSpatialChange('south', e.target.value)}
                                                        className="w-[71px] rounded border border-gray-300 px-2 py-1 text-sm"
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Current Selection */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Current Selection</h2>
                                <div className="space-y-2">
                                    {selectedFilters.length === 0 ? (
                                        <p className="text-sm text-gray-600">No filters selected</p>
                                    ) : (
                                        <>
                                            {selectedFilters.map((filter, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => removeFilter(filter)}
                                                    className="mr-2 mb-2 inline-block rounded bg-[#00589c] px-2 py-1 text-xs text-white hover:bg-[#00437a]"
                                                >
                                                    {filter}
                                                    <span className="ml-1 rounded bg-[#008acf] px-1">×</span>
                                                </button>
                                            ))}
                                            <button onClick={clearAllFilters} className="block text-sm text-[#00589c] hover:text-orange-500">
                                                Clear all
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Datacenters */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Datacenters</h2>
                                <div className="space-x-2 text-sm">
                                    {datacenters.map((center, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="mr-2 inline-block text-[#00589c] hover:text-orange-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFilters([...selectedFilters, center]);
                                            }}
                                        >
                                            {center}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Categories</h2>
                                <div className="max-h-96 space-x-2 overflow-y-auto text-sm">
                                    {categories.map((category, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="mr-2 inline-block text-[#00589c] hover:text-orange-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFilters([...selectedFilters, category]);
                                            }}
                                        >
                                            {category}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Resource Types */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Resource types</h2>
                                <div className="space-x-2 text-sm">
                                    {resourceTypes.map((type, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="mr-2 inline-block text-[#00589c] hover:text-orange-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFilters([...selectedFilters, type]);
                                            }}
                                        >
                                            {type}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Top Subjects */}
                            <div className="rounded bg-gray-100 p-5">
                                <h2 className="mb-3 text-base font-bold text-gray-700">Top Subjects</h2>
                                <div className="space-x-2 text-sm">
                                    {subjects.map((subject, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="mr-2 inline-block text-[#00589c] hover:text-orange-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFilters([...selectedFilters, subject]);
                                            }}
                                        >
                                            {subject}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Content Area */}
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
                                    <p className="text-gray-600">Suchergebnisse werden hier angezeigt...</p>
                                    {/* Search results would be rendered here */}
                                </div>
                            </div>

                            {/* Map */}
                            {showMap && (
                                <div className="rounded bg-gray-100 p-5 lg:w-[620px]">
                                    <div className="flex h-[330px] w-full items-center justify-center rounded bg-gray-200">
                                        <p className="text-gray-600">Karte wird hier angezeigt</p>
                                        {/* Leaflet map would be rendered here */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
