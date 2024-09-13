import AdminPageBar from "./AdminPageBar";
import AdminPageItem from "./AdminPageItem";

interface AdminPageProps {
  title: string;
}
export default function AdminPage({ title }: AdminPageProps) {
  return (
    <>
      <AdminPageBar />
      <AdminPageItem title={title} />
    </>
  );
}
