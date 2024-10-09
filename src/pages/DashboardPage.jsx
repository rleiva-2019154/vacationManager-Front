import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar/>
      <div className='flex-1 overflow-hidden'>
        DashboardPage
      </div>
      <Footer/>
    </div>
  )
}
