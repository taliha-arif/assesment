interface UniversityCardType {
    name: string;
    country: string;
}

interface UniversityCardProps {
    university: UniversityCardType
}

export default function UniversityCard({ university }: UniversityCardProps) {
    return (
        <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
            <div className="p-1">
                <h3 className="font-bold text-2xl mb-2 text-black">
                    {university.name}
                </h3>
                <p className="text-sm mt-1 font-bold text-gray-500">
                    {university.country}
                </p>
            </div>
        </div>
    );
}
