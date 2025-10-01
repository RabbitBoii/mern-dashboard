import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <div className="text-center">

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
          Welcome to the App.
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          This is a sample full stack web application with authentication and user dashboard.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href='/login' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ">
            Login
          </Link>

          <Link href='/signup' className="text-sm font-semibold leading-6 text-gray-900">
            Sign up <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
