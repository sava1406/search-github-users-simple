import { FunctionComponent, useState } from "react";
import { useLazySearchUsersQuery } from "./store/github/github.api";
import { UserCard } from "./components/UserCard";

const App: FunctionComponent = () => {
  const [usersName, setUserName] = useState<string>('');
  const [fetchUsers, { isSuccess, isLoading, data: users }] = useLazySearchUsersQuery();

  const handleSearch = () => {
    fetchUsers(usersName);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  }

  return (
    <div className="max-w-3xl mx-auto sm:px-4 px-3">
      <div className="mt-10 flex items-center flex-col">
        <div>
          <h1 className="text-2xl">Here you can search users</h1>
        </div>
        <div className="mt-5 w-full">
          <div>
            <form className="flex justify-center rounded-md overflow-hidden" onSubmit={handleFormSubmit}>
              <input value={usersName} onChange={e => setUserName(e.target.value)} type="text" className="p-2 w-full rounded-md rounded-r-none" />
              <button disabled={!usersName} onClick={handleSearch} className="disabled:opacity-60 bg-indigo-600 text-white px-6 text-lg font-semibold rounded-r-md">Search</button>
            </form>
          </div>
        </div>
      </div>

      {isLoading && <div className="flex justify-center items-center mt-5">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>}

      {(!isLoading && !!users?.length) && <div className="mt-5 grid gap-2">
        {users?.map(user => <UserCard key={user.id} userName={user.login} />)}
      </div>}

      {isSuccess && !users?.length && <div className="mt-5">
        <div className="text-xl">No users found</div>
      </div>}
    </div>
  );
};

export default App;