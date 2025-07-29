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
        west: ''
    });
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [showMap, setShowMap] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier würde die Suchlogik implementiert werden
        console.log('Searching for:', searchQuery);
    };

    const handleSpatialChange = (field: keyof SpatialFilter, value: string) => {
        setSpatialFilter(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const removeFilter = (filter: string) => {
        setSelectedFilters(prev => prev.filter(f => f !== filter));
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
        setSearchQuery('');
        setSpatialFilter({
            north: '',
            south: '',
            east: '',
            west: ''
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
            
            {/* Header */}
            <header className="bg-[#102a63] text-white">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="flex justify-between items-center py-6">
                        <div className="text-5xl">GFZ Data Services Portal 1.5</div>
                        <a href="https://www.gfz.de/en/" className="block">
                            <img src="/images/portal/gfz-logo_en.svg" alt="GFZ logo" className="h-12" />
                        </a>
                    </div>
                </div>
                
                {/* Navigation */}
                <nav className="bg-[#ccddeb]">
                    <div className="max-w-6xl mx-auto px-5 py-4">
                        <ul className="flex flex-wrap gap-x-12 text-gray-700">
                            <li className="flex items-center">
                                <img className="w-4 h-4 mr-1" src="/images/portal/home-icon.svg" />
                                <a href="/web" className="hover:text-orange-500">Home</a>
                            </li>
                            <li><a href="/web/find" className="hover:text-orange-500">Find</a></li>
                            <li><a href="/web/publish-data/publication-instructions" className="hover:text-orange-500">Publish Data</a></li>
                            <li><a href="/web/samples/introduction" className="hover:text-orange-500">Samples (IGSN)</a></li>
                            <li><a href="/web/support" className="hover:text-orange-500">Support</a></li>
                            <li><a href="/web/about-us" className="hover:text-orange-500">About Us</a></li>
                            <li className="text-sm pt-1">
                                <a href="/web/about-us/legal-notice" className="hover:text-orange-500">Legal Notice</a>
                            </li>
                            <li className="text-sm pt-1">
                                <a href="/web/about-us/data-protection" className="hover:text-orange-500">Data Protection</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                {/* Banner */}
                <div className="bg-[#e9e9e9] text-gray-800">
                    <div className="max-w-6xl mx-auto px-5 py-6 pl-24 relative">
                        <img src="/images/portal/banner.png" className="absolute h-full top-0 -left-4" />
                        <span className="text-lg">
                            This is the data portal. More information on the{' '}
                            <a href="/web" className="text-[#00589c] hover:text-orange-500">
                                GFZ Data Services homepage
                            </a>.
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto my-6">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                        {/* Left Sidebar */}
                        <div className="lg:w-[300px] space-y-5">
                            {/* Search */}
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Search</h2>
                                <span className="text-xs text-gray-600">(press ESC to close suggestions)</span>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">
                                    Spatial Filter
                                    <button
                                        onClick={() => setShowMap(!showMap)}
                                        className="ml-16 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                                    >
                                        Open Map
                                    </button>
                                </h2>
                                <div className="mt-3">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td className="text-center px-1">
                                                    <input
                                                        type="text"
                                                        placeholder="North"
                                                        value={spatialFilter.north}
                                                        onChange={(e) => handleSpatialChange('north', e.target.value)}
                                                        className="w-[71px] px-2 py-1 border border-gray-300 rounded text-sm"
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
                                                        className="w-[71px] px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                </td>
                                                <td className="text-center px-1">
                                                    <button className="w-[30px] h-[30px] bg-gray-200 hover:bg-gray-300 rounded">
                                                        🎯
                                                    </button>
                                                </td>
                                                <td className="pl-1">
                                                    <input
                                                        type="text"
                                                        placeholder="East"
                                                        value={spatialFilter.east}
                                                        onChange={(e) => handleSpatialChange('east', e.target.value)}
                                                        className="w-[71px] px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="text-center px-1">
                                                    <input
                                                        type="text"
                                                        placeholder="South"
                                                        value={spatialFilter.south}
                                                        onChange={(e) => handleSpatialChange('south', e.target.value)}
                                                        className="w-[71px] px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Current Selection */}
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Current Selection</h2>
                                <div className="space-y-2">
                                    {selectedFilters.length === 0 ? (
                                        <p className="text-sm text-gray-600">No filters selected</p>
                                    ) : (
                                        <>
                                            {selectedFilters.map((filter, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => removeFilter(filter)}
                                                    className="inline-block bg-[#00589c] text-white text-xs px-2 py-1 rounded mr-2 mb-2 hover:bg-[#00437a]"
                                                >
                                                    {filter}
                                                    <span className="ml-1 bg-[#008acf] px-1 rounded">×</span>
                                                </button>
                                            ))}
                                            <button
                                                onClick={clearAllFilters}
                                                className="block text-sm text-[#00589c] hover:text-orange-500"
                                            >
                                                Clear all
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Datacenters */}
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Datacenters</h2>
                                <div className="space-x-2 text-sm">
                                    {datacenters.map((center, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="inline-block text-[#00589c] hover:text-orange-500 mr-2"
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
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Categories</h2>
                                <div className="space-x-2 text-sm max-h-96 overflow-y-auto">
                                    {categories.map((category, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="inline-block text-[#00589c] hover:text-orange-500 mr-2"
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
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Resource types</h2>
                                <div className="space-x-2 text-sm">
                                    {resourceTypes.map((type, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="inline-block text-[#00589c] hover:text-orange-500 mr-2"
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
                            <div className="bg-gray-100 p-5 rounded">
                                <h2 className="text-base font-bold text-gray-700 mb-3">Top Subjects</h2>
                                <div className="space-x-2 text-sm">
                                    {subjects.map((subject, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="inline-block text-[#00589c] hover:text-orange-500 mr-2"
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
                        <div className="flex-1 flex flex-col lg:flex-row gap-5">
                            {/* Search Results */}
                            <div className="flex-1 bg-gray-100 p-5 rounded">
                                <div className="border-b border-gray-800 pb-3 mb-3">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-600">
                                            Showing 0 results
                                        </div>
                                        <div className="space-x-2">
                                            {/* Pagination would go here */}
                                        </div>
                                    </div>
                                </div>
                                <div className="min-h-[400px]">
                                    <p className="text-gray-600">Suchergebnisse werden hier angezeigt...</p>
                                    {/* Search results would be rendered here */}
                                </div>
                            </div>

                            {/* Map */}
                            {showMap && (
                                <div className="lg:w-[620px] bg-gray-100 p-5 rounded">
                                    <div className="w-full h-[330px] bg-gray-200 flex items-center justify-center rounded">
                                        <p className="text-gray-600">Karte wird hier angezeigt</p>
                                        {/* Leaflet map would be rendered here */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-5 py-8 flex items-center justify-between">
                <a
                    href="http://www.gfz.de/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-xs"
                >
                    © GFZ Helmholtz-Centre - <strong>for Geosciences</strong>
                </a>
                
                <div className="flex items-center gap-8">
                    <a
                        href="http://www.helmholtz.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/images/portal/logo_helmholtz_gemeinschaft_de.gif"
                            alt="Logo der Helmholtz-Gemeinschaft"
                            className="h-[70px]"
                        />
                    </a>
                    <a href="http://www.gfz.de/en/">
                        <img
                            src="/images/portal/GFZ_Wortmarke_SVG_min2_en.svg"
                            alt="Logo GFZ Potsdam"
                            className="h-11"
                        />
                    </a>
                </div>
            </footer>
        </>
    );
}