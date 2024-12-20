import { User } from "../types/User";
import { UserCard } from "./UsersCard";

interface UsersListProps {
	users: User[];
	dropUser: (user: User) => void;
}

export function UsersList({ users, dropUser }: UsersListProps) {
	return (
		<section className="flex flex-col items-center p-4 gap-6">
			{users.map((user) => (
				<UserCard user={user} key={user.id} dropUser={dropUser} />
			))}
		</section>
	);
}
