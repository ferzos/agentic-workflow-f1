import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '@/components/Layout'
import { CalendarPage } from '@/pages/CalendarPage'
import { ConstructorStandingsPage } from '@/pages/ConstructorStandingsPage'
import { DriverPage } from '@/pages/DriverPage'
import { DriverStandingsPage } from '@/pages/DriverStandingsPage'
import { HomePage } from '@/pages/HomePage'
import { RacePage } from '@/pages/RacePage'

export const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/calendar', element: <CalendarPage /> },
      { path: '/races/:round', element: <RacePage /> },
      { path: '/drivers/:id', element: <DriverPage /> },
      { path: '/standings/drivers', element: <DriverStandingsPage /> },
      { path: '/standings/constructors', element: <ConstructorStandingsPage /> },
    ],
  },
]

export const App = () => <RouterProvider router={createBrowserRouter(routes)} />
