import React from 'react';
import { IoSearch, IoHomeOutline, IoCompassOutline, IoMailOutline, IoHeartOutline, IoAddCircleOutline, IoPersonCircleOutline, IoLogOutOutline, IoMenuOutline } from 'react-icons/io5';
export const SearchPage = () => {

    return (
        <div className="min-h-screen  flex text-white pb-16 lg:pb-0">
            
            <main className="w-full p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Search Input Bar (Main feature of the Search Page) */}
                    {/* Padding and styles are adjusted to fit well on mobile */}
                    <div className="flex items-center bg-gray-900 p-3 rounded-xl border border-gray-800 shadow-lg mb-6 sticky top-0 z-10">
                        <IoSearch size={24} className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search people, posts, and more..."
                            className="bg-transparent w-full text-white placeholder-gray-500 text-base sm:text-lg focus:outline-none"
                        />
                    </div>
                    
                    {/* Explore & Discover Header */}
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-200">Explore & Discover</h2>

                    {/* Example of a grid layout for 'Explore' content */}
                    {/* Grid columns change based on screen size: 2 cols on mobile, 3 on medium, 4 on large */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2">
                        {/* Dummy Explore Posts */}
                        {[...Array(20)].map((_, index) => (
                            <div key={index} className="aspect-square bg-gray-800 hover:bg-gray-700 transition duration-300 cursor-pointer relative group overflow-hidden">
                                <img
                                    src={`https://picsum.photos/400?random=${index}`}
                                    alt={`Explore post ${index + 1}`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                {/* Overlay for likes/comments icon */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IoHeartOutline size={24} className="text-white mr-2" />
                                    <span className="text-white font-bold text-sm">{(index + 1) * 10}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12 text-gray-500 p-4">
                        <p>End of explore posts for now.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};