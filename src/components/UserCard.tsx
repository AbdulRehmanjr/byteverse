import Image from 'next/image';
import Link from 'next/link';

type ComponentProps = {
  user:UserProps
}

export const UserCard = ({ user }: ComponentProps) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="relative w-12 h-12">
        <Image
          src={user.avatarUrl}
          alt={user.username}
          fill
          className="rounded object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-baseline gap-2">
          <Link href={`/users/${user.username}`} className="text-blue-600 font-medium">
            {user.username}
          </Link>
          <span className="text-gray-600">{user.location}</span>
        </div>
        
        <div className="mt-1 text-sm text-gray-600">
          {user.tags.map((tag, index) => (
            <span key={index} className="mr-2">
              {tag}
              {index < user.tags.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>

      <div className="text-lg font-medium">
        {user.reputation}
      </div>
    </div>
  );
};