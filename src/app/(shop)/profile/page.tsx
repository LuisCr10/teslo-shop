import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Title title="Perfil" />
      
      {/* Información del usuario */}
      <div className="mb-8 flex justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800">{session.user.name}</h2>
          <p className="text-lg text-gray-600">{session.user.email}</p>
        </div>
      </div>

      {/* Tarjeta con detalles */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-3xl mb-6 font-bold text-gray-700">Detalles del Perfil</h3>
        
        <div className="space-y-4">
          <div>
            <strong className="text-gray-600">ID:</strong>
            <p className="text-gray-800">{session.user.id}</p>
          </div>
          <div>
            <strong className="text-gray-600">Email:</strong>
            <p className="text-gray-800">{session.user.email}</p>
          </div>
          <div>
            <strong className="text-gray-600">Verificado:</strong>
            <p className="text-gray-800">{session.user.emailVerified ? "Sí" : "No"}</p>
          </div>
          <div>
            <strong className="text-gray-600">Rol:</strong>
            <p className="text-gray-800">{session.user.role}</p>
          </div>
        </div>
      </div>

      {/* Mostrar si hay imagen de perfil */}
      {session.user.image && (
        <div className="mt-8 text-center">
          <img src={session.user.image} alt="Foto de perfil" className="w-32 h-32 rounded-full mx-auto"/>
        </div>
      )}
    </div>
  );
}
