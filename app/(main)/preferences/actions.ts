"use server";

import { deleteUserByEmail } from "@/lib/users";
import { revalidatePath } from "next/cache";

export async function deleteAccountAction(email: string) {
  if (!email) {
    return { error: "E-mail do usuário não fornecido." };
  }

  try {
    await deleteUserByEmail(email);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Não foi possível excluir a conta." };
  }
}