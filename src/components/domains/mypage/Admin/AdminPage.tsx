import AdminPageBar from "./AdminPageBar";
import AdminPageItem from "./AdminPageItem";

interface AdminPageProps {
  title: string;
}
export default function AdminPage({ title }: AdminPageProps) {
  return (
    <section>
      <AdminPageBar />
      <AdminPageItem title={title} />
    </section>
  );
}
