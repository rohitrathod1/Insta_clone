import React from 'react';

// ✅ SVG Icons (compact, responsive)
const IconHome = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
const IconSearch = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
const IconCompass = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>);
const IconMail = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>);
const IconHeart = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
const IconAdd = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
const IconPerson = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const IconLogout = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>);

export const ExplorePage = () => {
    return (
        <div className="min-h-screen  flex text-white pb-20 sm:pb-24 md:pb-0 font-sans">
            <main className="w-full lg:ml-32 lg:mr-32 p-3 sm:p-4 md:p-6 lg:p-8">

                {/* Mobile Header */}
                <div className='flex justify-between items-center lg:hidden mb-4 pt-2'>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Explore</h1>
                    <button className='text-white p-2 hover:text-pink-500 transition'>
                        <IconSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="max-w-7xl mx-auto">

                    {/* Trending Section */}
                    <div className='mb-8'>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-200">Featured & Trending</h2>
                        <div className='flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-hide'>
                            {['Nature', 'Coding', 'Travel', 'Food', 'Design', 'Science', 'Art', 'Fitness'].map(tag => (
                                <button
                                    key={tag}
                                    className='px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-pink-500 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 transition duration-300 shadow-sm'
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Discover Posts Grid */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-200">Discover Posts</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 md:gap-3">
                        {[...Array(25)].map((_, index) => (
                            <div key={index}
                                className="aspect-square bg-gray-800 transition duration-300 cursor-pointer relative group overflow-hidden rounded-md transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                <img
                                    src={`https://picsum.photos/400?random=${index + 100}`}
                                    alt={`Explore post ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-300"
                                />
                                {/* Overlay with interaction icons */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                                    <div className="flex items-center text-xs sm:text-sm">
                                        <IconHeart className="text-pink-500 mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                                        <span className="text-white font-semibold">{(index + 1) * 23}</span>
                                        <IconMail className="text-white ml-3 sm:ml-4 mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-white font-semibold">{(index + 1) * 7}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10 sm:mt-12 text-gray-500 p-2 sm:p-4">
                        <p className="text-sm sm:text-base">Scroll down for more amazing posts!</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
