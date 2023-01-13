import {Outlet} from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
        <main className=' flex items-center justify-center bg-gradient-to-tr from-fuchsia-800 via-cyan-600 to-purple-500 w-full h-screen'>
          <section className='m-7'>
            <Outlet />
          </section>
        </main>
    </>
  )
}
