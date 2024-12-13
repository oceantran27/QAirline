import AdminNavbar from "@/components/admin/navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-row relative">
      <div className="fixed top-0">
        <AdminNavbar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default AdminLayout;
