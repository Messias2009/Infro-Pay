import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardView } from "@/components/admin/AdminDashboardView";

export const Route = createFileRoute("/_authenticated/adm/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários e Vendedores — Admin InfroPay" },
      {
        name: "description",
        content: "Gestão de utilizadores, produtos e vendas da plataforma InfroPay.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      <AdminDashboardView />
    </div>
  );
}
