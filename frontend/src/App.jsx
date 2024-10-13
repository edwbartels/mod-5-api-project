import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import CreateSpot from './components/Spots/CreateSpot';
import SpotsDetails from './components/Spots/SpotsDetails';
import ManagePage from './components/User/Spots/ManagePage';
import UpdateSpotPage from './components/User/Spots/UpdateSpotPage';

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <LandingPage />,
			},
			{
				path: '/spots/create',
				element: <CreateSpot />,
			},
			{
				path: '/spots/:spotId',
				element: <SpotsDetails />,
			},
			{
				path: '/user/manage/spots',
				element: <ManagePage />,
			},
			{
				path: '/user/manage/spots/:spotId',
				element: <UpdateSpotPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
