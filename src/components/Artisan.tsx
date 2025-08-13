'use client';

import Image from "next/image";
import type { User } from "@/lib/definitions";

export default function Artisan({ artisan }: { artisan: User & { product_count: number; average_rating: number | null } }) {
    return (
        <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-slate-800 border-2 border-transparent hover:border-amber-400">
            <div className="relative w-20 h-20 mb-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                {artisan.profile_picture ? (
                    <Image
                        src={artisan.profile_picture}
                        alt={artisan.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {artisan.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <h3 className="font-semibold text-lg mb-2 text-center text-white">
                {artisan.name}
            </h3>

            {artisan.biography && (
                <p className="text-gray-300 text-center text-sm mb-3 line-clamp-2">
                    {artisan.biography}
                </p>
            )}

            <div className="flex flex-col items-center gap-2 mb-4 w-full">
                {artisan.location && (
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <span>📍</span>
                        <span>{artisan.location}</span>
                    </div>
                )}

                <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <span>📦</span>
                    <span>{artisan.product_count} products</span>
                </div>

                {artisan.average_rating && (
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                        <span>⭐</span>
                        <span>{artisan.average_rating.toFixed(1)}</span>
                    </div>
                )}

                {artisan.years_of_experience && (
                    <span className="text-xs text-gray-400">
                        {artisan.years_of_experience} years experience
                    </span>
                )}
            </div>

            <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
                Artisan
            </span>
        </div>
    );
}