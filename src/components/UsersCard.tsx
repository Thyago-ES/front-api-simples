import { GrTrash } from "react-icons/gr";
import { User } from "../types/User";

interface UserCardProps {
	user: User;
	dropUser: (user: User) => void;
}

export function UserCard({ user, dropUser }: UserCardProps) {
	return (
		<article className="bg-slate-200 w-full p-2 relative rounded hover:scale-105 transition-all duration-200">
			<p>
				<span className="font-bold">Nome:</span> {user.name}
			</p>
			<p>
				<span className="font-bold">Email:</span> {user.email}
			</p>
			<button
				className="bg-red-500 hover:bg-red-600 transition-all duration-200 p-1.5 flex items-center rounded-lg absolute right-1 -top-2"
				onClick={() => dropUser(user)}
			>
				<GrTrash size={20} color="#e2e8f0" />
			</button>
		</article>
	);
}
