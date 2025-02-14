'use client';

import { useState, useEffect, SetStateAction } from 'react';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { UserCard } from '../../components/UserCard';
import { TimeFrameSelector } from '../../components/TimeFrameSelector';
import { fetchUsers } from '../lib/data';

import { Input } from '~/components/ui/input';

export default function UsersPage() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filter, setFilter] = useState('');
  const [timeFrame, setTimeFrame] = useState('week');
  const [userType, setUserType] = useState('reputation');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Filter by user"
            className="max-w-xs"
            value={filter}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFilter(e.target.value)}
          />
          
          <Tabs value={userType} onValueChange={setUserType}>
            <TabsList>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
              <TabsTrigger value="new">New users</TabsTrigger>
              <TabsTrigger value="voters">Voters</TabsTrigger>
              <TabsTrigger value="editors">Editors</TabsTrigger>
              <TabsTrigger value="moderators">Moderators</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TimeFrameSelector
          selectedTimeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
        />

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.username} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}