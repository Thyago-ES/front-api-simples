import { FormEvent, useEffect, useRef, useState } from "react";
import { UsersList } from "./components/UsersList";
import { User } from "./types/User";
import { deleteUser, getUsers, postUser } from "./services/api";

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		loadUsers();
	}, []);

	async function loadUsers() {
		const users = await getUsers();
		setUsers(users);
	}

	async function createUser(e: FormEvent) {
		e.preventDefault();

		if (!nameRef.current?.value || !emailRef.current?.value) {
			return alert("Preencha todos os campos");
		}

		const reqUser = {
			name: nameRef.current?.value,
			email: emailRef.current?.value,
		};

		try {
			const newUser = await postUser(reqUser);

			console.log(newUser);

			setUsers((oldUsers) => [...oldUsers, { ...newUser.user }]);

			nameRef.current.value = "";
			emailRef.current.value = "";
		} catch (error: any) {
			alert(error.message);
		}
	}

	async function dropUser(user: User) {
		const response = await deleteUser(user.id);

		if (!response) {
			alert("Erro");
		}

		setUsers((users) => users.filter((current) => user.id != current.id));
	}

	return (
		<div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
			<main className="w-full max-w-96">
				<h1 className="text-3xl text-slate-200 font-semibold mb-14 text-center mt-16">
					Gerenciamento de usuários
				</h1>

				<section className="w-full flex justify-center mb-10">
					<form className="w-full flex flex-col gap-5" onSubmit={createUser}>
						<fieldset className="flex flex-col">
							<label htmlFor="name" className="text-slate-200 text-lg">
								Nome:
							</label>
							<input
								type="text"
								id="name"
								placeholder="Digite o nome do usuário"
								className="rounded-lg p-2"
								ref={nameRef}
							/>
						</fieldset>

						<fieldset className="flex flex-col">
							<label htmlFor="email" className="text-slate-200 text-lg">
								Email:
							</label>
							<input
								type="text"
								id="email"
								placeholder="Digite o email do usuário"
								className="rounded-lg p-2"
								ref={emailRef}
							/>
						</fieldset>

						<button className="bg-green-500 hover:bg-green-600 transition-all duration-200 mt-4 rounded-lg p-2 font-semibold text-lg">
							Cadastrar
						</button>
					</form>
				</section>

				<UsersList users={users} dropUser={dropUser} />
			</main>
		</div>
	);
}

export default App;
