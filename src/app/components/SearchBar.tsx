"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, fuzzySearch } from '../utils/helpers';
import { fetchSearchHistory, fetchUniversities, saveSearchTerm } from '../services/index';
import UniversityCard from './UniversityCard';


interface History {
	term: string;
}

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchType, setSearchType] = useState('name');
	const [showHistory, setShowHistory] = useState(false);
	const [history, setSearchHistory] = useState<History[]>([]);
	const [universities, setUniversities] = useState([]);


	const handleSearch = async (term: string) => {
		await saveSearchTerm(term);
		let filteredUniversities: any;
		if (searchType === 'name') {
			const queryParam = '/search?name=' + term;
			const data = await fetchUniversities(queryParam);
			// Apply fuzzy search on the university names
			filteredUniversities = fuzzySearch(term, data, 'name');

		} else if (searchType === 'country') {
			const queryParam = '/search?country=' + term;
			const data = await fetchUniversities(queryParam);

			// Apply fuzzy search on the country names
			filteredUniversities = fuzzySearch(term, data, 'country');
		}

		setUniversities(filteredUniversities);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchSearchHistory();
				setSearchHistory(data);
			} catch (error) {
				console.log('err', error)
			}
		};
		fetchData();
	}, []);


	const optimizedFn = useCallback(debounce(handleSearch), []);

	const handleSelectChange = (event: any) => {
		const selectedType = event.target.value as string;
		setSearchType(selectedType);
	};

	const inputRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setShowHistory(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
				<div className="mb-4">
					<label className="block mb-2 text-sm font-bold text-gray-700">Select Search Type</label>
					<select
						className="block w-full p-2 border border-gray-300 rounded focus:outline-none"
						value={searchType}
						onChange={handleSelectChange}
					>
						<option value="name">University Name</option>
						<option value="country">Country Name</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block mb-2 text-sm font-bold text-gray-700">
						Search by {searchType === 'name' ? 'University Name' : 'Country Name'}
					</label>
					<input
						ref={inputRef}
						className="block w-full p-2 border border-gray-300 rounded focus:outline-none"
						type="text"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value)
							optimizedFn(e.target.value)
						}}
						onClick={() => setShowHistory(true)}
					/>
					{showHistory && history.length ?
						<div className="bg-white border border-gray-300 w-full mt-2 p-2 rounded shadow-lg">
							{
								history.map((result, index) => (
									<ul key={index}>
										{result.term}
									</ul>
								))
							}
						</div> : <></>
					}

				</div>

			</div>
			<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
				{universities.map((data: any) => (
					<UniversityCard university={data.item} />
				))}
			</div>
		</>


	);
};

