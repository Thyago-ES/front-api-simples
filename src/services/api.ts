import axios from "axios";
import { User } from "../types/User";

interface Response {
	message: string;
	user: User;
}

const api = axios.create({
	baseURL: "http://localhost:3000/",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getUsers(): Promise<User[]> {
	try {
		const response = await api.get<User[]>("/users");
		return response.data;
	} catch (error: any) {
		if (!error.response.data.message) {
			throw new Error("O servidor tá desligado");
		}
		throw new Error(error.response.data.message);
	}
}

export async function postUser(user: Omit<User, "id">): Promise<Response> {
	try {
		const response = await api.post<Response>("/users", user);
		return response.data;
	} catch (error: any) {
		if (!error.response.data.message) {
			throw new Error("O servidor tá desligado");
		}
		throw new Error(error.response.data.message);
	}
}

export async function deleteUser(id: number): Promise<Omit<Response, "user">> {
	try {
		const response = await api.delete<Omit<Response, "user">>(`/users/${id}`);
		return response.data;
	} catch (error: any) {
		if (!error.response.data.message) {
			throw new Error("O servidor tá desligado");
		}
		throw new Error(error.response.data.message);
	}
}
