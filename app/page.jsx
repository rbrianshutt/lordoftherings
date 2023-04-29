import Image from 'next/image';
import Link from 'next/link';
import lotr from '../public/lordoftheringslogo.png';

async function fetchLotr() {
	const res = await fetch(`https://the-one-api.dev/v2/character?sort=name:asc`, {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function Home() {
	const rings = await fetchLotr();
	// console.log(rings);

	return (
		<div className='bg-gray-900 text-gray-200 max-w-screen overflow-x-hidden'>
			<Image src={lotr} className='bg-gray-900 text-gray-200 mx-auto' />
			<h1 className='text-5xl text-center'>Characters and Stats</h1>
			<div className='flex flex-wrap justify-center bg-gray-900 text-gray-200'>
				{rings.docs.map((ring) => (
					<ul key={ring._id} className='sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
						<p className='bg-gray-800 shadow-lg text-xl font-bold px-2'>{ring.name}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Race: {ring.race}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Gender: {ring.gender}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Realm: {ring.realm}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Birth Year: {ring.birth}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Death Year: {ring.death}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Spouse: {ring.spouse}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Hair: {ring.hair}</p>
						<p className='bg-gray-800 shadow-lg px-2'>Height: {ring.height}</p>
						<p className='bg-gray-800 shadow-lg px-2'>WikiUrl: {ring.wikiUrl}</p>
					</ul>
				))}
			</div>
		</div>
	);
}
