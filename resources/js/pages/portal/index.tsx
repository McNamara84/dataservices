import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PortalSidebar from '@/components/portal/sidebar';
import PortalResults from '@/components/portal/results';

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
        // This is where the search logic would be implemented
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

    // Example data for tags (replace with real data later)
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
                        <PortalSidebar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            handleSearch={handleSearch}
                            spatialFilter={spatialFilter}
                            handleSpatialChange={handleSpatialChange}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            removeFilter={removeFilter}
                            clearAllFilters={clearAllFilters}
                            datacenters={datacenters}
                            categories={categories}
                            resourceTypes={resourceTypes}
                            subjects={subjects}
                            showMap={showMap}
                            setShowMap={setShowMap}
                        />
                        <PortalResults showMap={showMap} />
                    </div>
                </div>
            </div>
        </>
    );
}
