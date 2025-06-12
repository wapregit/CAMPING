import { MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Page not found</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, we couldn’t find the page you’re looking for. Here are some helpful links:
            </p>

            <div className="mt-6 flex items-center gap-x-3">
              <button
                onClick={() => navigate(-1)}
                className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <MoveLeft strokeWidth={1} />
                <span>
                  <Link to={''}>Go back</Link>
                </span>
              </button>

              <button className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500">
                <Link to={'/'}>Take me home</Link>
              </button>
            </div>
          </div>

          <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2">
            <img
              className="h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem]"
              src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Notfound;
