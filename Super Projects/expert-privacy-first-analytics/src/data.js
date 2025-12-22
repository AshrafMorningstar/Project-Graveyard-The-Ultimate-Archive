/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { subDays, format } from 'date-fns'

// Mock data generator for privacy analytics
export const generateData = () => {
  const visitors = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i)
    visitors.push({
      date: format(date, 'MMM dd'),
      visitors: Math.floor(Math.random() * 500) + 100,
      pageviews: Math.floor(Math.random() * 1000) + 200,
    })
  }

  const topPages = [
    { path: '/', views: 4521 },
    { path: '/blog/react-hooks', views: 2310 },
    { path: '/pricing', views: 1890 },
    { path: '/docs/api', views: 1205 },
    { path: '/about', views: 890 },
  ]

  const referrers = [
    { source: 'Direct', count: 3200 },
    { source: 'Google', count: 2800 },
    { source: 'Twitter', count: 1200 },
    { source: 'GitHub', count: 800 },
    { source: 'IndieHackers', count: 450 },
  ]
  
  const devices = [
      { name: 'Desktop', value: 55 },
      { name: 'Mobile', value: 38 },
      { name: 'Tablet', value: 7 },
  ]

  return { visitors, topPages, referrers, devices }
}
